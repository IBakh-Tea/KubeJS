const ClipContext = Java.loadClass("net.minecraft.world.level.ClipContext");

const toBool = (val) => val === true || val === 1 || val === "true";

const toArray = (val) =>
  Array.isArray(val) ? val : val ? Array.from(val) : [];

const GunUtils = {
  updateData(item, callback) {
    const data = item.customData ?? {};
    try {
      callback(data);
    } finally {
      item.setCustomData(data);
    }
  },

  playSound(level, player, sound) {
    try {
      global.playSound(level, player, sound);
    } catch (err) {
      console.error(`[GunUtils] playSound failed (${sound}): ${err}`);
    }
  },

  load: (level, player) =>
    GunUtils.playSound(level, player, "minecraft:block.wooden_button.click_on"),
  empty: (level, player) =>
    GunUtils.playSound(level, player, "minecraft:block.tripwire.click_on"),
  shoot: (level, player) =>
    GunUtils.playSound(level, player, "minecraft:entity.shulker.shoot"),

  shootBullet: (player, distance, damage, bulletCount, spread) => {
    let level = player.level;
    let startPos = player.eyePosition;

    let p = startPos.add(player.lookAngle.scale(0.25));

    level.spawnParticles(
      "kubejs:muzzleflash",
      true,
      p.x,
      p.y - 0.1,
      p.z,
      0,
      0,
      0,
      1,
      0,
    );

    for (let i = 0; i < bulletCount; i++) {
      let offX = (Math.random() - 0.5) * spread;
      let offY = (Math.random() - 0.5) * spread;
      let offZ = (Math.random() - 0.5) * spread;

      let lookVec = player.lookAngle.add(offX, offY, offZ).scale(distance);
      let endPos = startPos.add(lookVec);

      let blockHit = level.clip(
        new ClipContext(
          startPos,
          endPos,
          ClipContext.Block.COLLIDER,
          ClipContext.Fluid.NONE,
          player,
        ),
      );

      let finalEndPos = blockHit.location;

      let distToHit = startPos.distanceTo(finalEndPos);
      let steps = Math.floor(distToHit * 0.5);
      for (let j = 0; j < steps; j++) {
        let t = j / steps;
        let px = startPos.x + (finalEndPos.x - startPos.x) * t;
        let py = startPos.y + (finalEndPos.y - startPos.y) * t;
        let pz = startPos.z + (finalEndPos.z - startPos.z) * t;
        level.spawnParticles(
          "kubejs:hitparticle",
          true,
          px,
          py,
          pz,
          0,
          0,
          0,
          1,
          0,
        );
      }

      let box = player.boundingBox.expandTowards(lookVec).inflate(1.0);
      let entityHit = null;
      let minDistance = distToHit;

      level.getEntitiesWithin(box).forEach((entity) => {
        if (entity.uuid != player.uuid && entity.living) {
          let hit = entity.boundingBox.inflate(0.2).clip(startPos, finalEndPos);
          if (hit.isPresent()) {
            let d = startPos.distanceTo(hit.get());
            if (d < minDistance) {
              minDistance = d;
              entityHit = entity;
            }
          }
        }
      });

      if (entityHit) {
        entityHit.attack(damage);
        global.playSound(
          level,
          player,
          "minecraft:entity.experience_orb.pickup",
        );
      } else {
      }
      player.camera.setRotation(
        player.yaw + Math.floor(Math.random() * 3) - 1,
        player.pitch - Math.floor(Math.random() * 5),
      );
    }
  },
};

const GunActions = {
  flintlock: (config) => (e) => {
    const { item, player, level } = e;
    const offhand = player.getHeldItem("off_hand");

    GunUtils.updateData(item, (data) => {
      if (data.stage == null) data.stage = 0;

      switch (parseInt(data.stage)) {
        case 0:
          if (offhand.id === "minecraft:gunpowder") {
            data.stage = 1;
            offhand.shrink(1);
            player.cooldowns.addCooldown(item, 5);
          } else if (offhand.id === config.ammo) {
            data.stage = 2;
            offhand.shrink(1);
            player.cooldowns.addCooldown(item, 10);
          }
          break;

        case 1:
          if (
            offhand.count < config.bulletsPerShot ||
            (offhand.id !== "kubejs:copper_roundshot" &&
              offhand.id !== "kubejs:iron_roundshot")
          ) {
            e.cancel();
            return;
          }
          data.stage = 2;
          offhand.shrink(config.bulletsPerShot);
          player.cooldowns.addCooldown(item, 5);
          break;

        case 2:
          if (offhand.id !== "kubejs:ramrod") {
            e.cancel();
            return;
          }
          data.stage = 3;
          player.cooldowns.addCooldown(item, 5);
          break;

        case 3:
          if (offhand.id !== "minecraft:air") {
            e.cancel();
            return;
          }
          GunUtils.shootBullet(
            player,
            config.distance,
            config.damage,
            config.bulletsPerShot,
            config.spread,
          );
          GunUtils.shoot(level, player);
          data.stage = 0;
          player.cooldowns.addCooldown(item, 15);
          break;
      }
    });
  },

  revolver: (config) => (e) => {
    const { item, player, level } = e;
    const offhand = player.getHeldItem("off_hand");

    GunUtils.updateData(item, (data) => {
      if (!data.cylinder) {
        data.open = false;
        data.cylinder = Array(6).fill("minecraft:air");
        data.currentIndex = 0;
      }

      const cylinder = toArray(data.cylinder);
      const idx = parseInt(data.currentIndex) % cylinder.length;
      const isOpen = toBool(data.open);
      const ammoHere = cylinder[idx];

      if (player.shiftKeyDown) {
        data.open = !isOpen;
        return;
      }

      if (
        isOpen &&
        offhand.id === config.ammo &&
        ammoHere === "minecraft:air"
      ) {
        cylinder[idx] = offhand.id;
        data.cylinder = cylinder;
        data.currentIndex = (idx + 1) % cylinder.length;
        offhand.shrink(1);
        player.cooldowns.addCooldown(item, 10);
        GunUtils.load(level, player);
      } else if (!isOpen && ammoHere !== "minecraft:air") {
        cylinder[idx] = "minecraft:air";
        data.cylinder = cylinder;
        data.currentIndex = (idx + 1) % cylinder.length;
        GunUtils.shootBullet(player, config.distance, config.damage, 1, 0.1);
        GunUtils.shoot(level, player);
      } else {
        if (!isOpen) data.currentIndex = (idx + 1) % cylinder.length;
        GunUtils.empty(level, player);
      }
    });
  },

  directLoader: (config) => (e) => {
    const { item, player, level } = e;
    const offhand = player.getHeldItem("off_hand");

    GunUtils.updateData(item, (data) => {
      if (!data.internalStorage) {
        data.open = false;
        data.internalStorage = [];
      }

      const storage = toArray(data.internalStorage);
      const isOpen = toBool(data.open);

      if (
        isOpen &&
        storage.length < config.capacity &&
        offhand.id === config.ammo
      ) {
        storage.push(offhand.id);
        data.internalStorage = storage;
        offhand.shrink(1);
        player.cooldowns.addCooldown(item, 10);
        GunUtils.load(level, player);
      } else if (
        !isOpen &&
        storage.length > 0 &&
        offhand.id === "minecraft:air"
      ) {
        const isDouble =
          config.allowDouble && player.shiftKeyDown && storage.length >= 2;
        const count = isDouble ? 2 : 1;
        storage.splice(0, count);
        data.internalStorage = storage;

        GunUtils.shootBullet(
          player,
          config.distance,
          config.damage,
          config.bulletsPerShot * count,
          config.spread,
        );
        GunUtils.shoot(level, player);
        player.cooldowns.addCooldown(item, 15);
      } else if (player.shiftKeyDown) {
        data.open = !isOpen;
      } else {
        GunUtils.empty(level, player);
      }
    });
  },

  magazine: (config) => (e) => {
    const { item, player, level } = e;
    const offhand = player.getHeldItem("off_hand");

    GunUtils.updateData(item, (data) => {
      if (!data.internalStorage) {
        data.internalStorage = [];
        data.magazine = config.magazine.standard;
        if (Object.keys(config.muzzle ?? {}).length > 0)
          data.muzzle = "minecraft:air";
        if (Object.keys(config.underbarrel ?? {}).length > 0)
          data.underbarrel = "minecraft:air";
        if (Object.keys(config.stock ?? {}).length > 0)
          data.stock = "minecraft:air";
      }

      const storage = toArray(data.internalStorage);

      const attachmentSlots = [
        { key: "muzzle", cfg: config.muzzle },
        { key: "underbarrel", cfg: config.underbarrel },
        { key: "stock", cfg: config.stock },
      ];

      for (const { key, cfg } of attachmentSlots) {
        if (data[key] == null) continue;
        if (!Object.values(cfg ?? {}).includes(offhand.id)) continue;

        const prev = Item.of(data[key]);
        player.addItem(prev);
        data[key] = offhand.id;
        offhand.shrink(1);
        player.cooldowns.addCooldown(item, 15);
        return;
      }

      const validMags = config.magazine.filter(Boolean);

      if (
        player.shiftKeyDown &&
        data.magazine !== "minecraft:air" &&
        offhand.id === "minecraft:air"
      ) {
        const mag = Item.of(data.magazine);
        mag.setCustomData({ internalStorage: storage });
        player.addItem(mag);
        data.internalStorage = [];
        data.magazine = "minecraft:air";
      } else if (
        data.magazine === "minecraft:air" &&
        validMags.includes(offhand.id)
      ) {
        data.internalStorage = toArray(offhand.customData?.internalStorage);
        data.magazine = offhand.id;
        offhand.shrink(1);
      } else if (storage.length > 0) {
        storage.shift();
        data.internalStorage = storage;

        GunUtils.shootBullet(
          player,
          config.distance,
          config.damage,
          1,
          config.spread,
        );
        GunUtils.shoot(level, player);
        player.cooldowns.addCooldown(item, 15);
      } else {
        GunUtils.empty(level, player);
      }
    });
  },
};

const MagActions = (config) => (e) => {
  const { item, player, level } = e;
  const offhand = player.getHeldItem("off_hand");

  GunUtils.updateData(item, (data) => {
    if (!data.internalStorage) data.internalStorage = [];

    const storage = toArray(data.internalStorage);

    if (storage.length < config.clipSize && offhand.id === config.clipType) {
      storage.push(offhand.id);
      data.internalStorage = storage;
      offhand.shrink(1);
      player.cooldowns.addCooldown(item, config.reloadTime);
      GunUtils.load(level, player);
    }

    item.setCustomModelData(storage.length >= config.clipSize ? 1 : 0);
  });
};

const ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack");

const slotMapper = {
  5: 39, // EquipmentSlot.FEET
  6: 38, // EquipmentSlot.LEGS
  7: 37, // EquipmentSlot.CHEST
  8: 36, // EquipmentSlot.HEAD
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  21: 21,
  22: 22,
  23: 23,
  24: 24,
  25: 25,
  26: 26,
  27: 27,
  28: 28,
  29: 29,
  30: 30,
  31: 31,
  32: 32,
  33: 33,
  34: 34,
  35: 35,
  36: 0, // hotbar
  37: 1, // hotbar
  38: 2, // hotbar
  39: 3, // hotbar
  40: 4, // hotbar
  41: 5, // hotbar
  42: 6, // hotbar
  43: 7, // hotbar
  44: 8, // hotbar
};

PlayerEvents.inventoryChanged((e) => {
  const { player, item, slot } = e,
    inventory = player.getInventory();
  console.info(slot);

  if (slot == 5) {
    inventory.setItem(slotMapper[slot], ItemStack.EMPTY);
  }
});

ItemEvents.rightClicked("minecraft:iron_ingot", (event) => {
  const { player, level, target } = event;

  let spawnX = player.x;
  let spawnY = player.y;
  let spawnZ = player.z;

  let armorStand = level.createEntity("minecraft:armor_stand");
  armorStand.x = spawnX;
  armorStand.y = spawnY;
  armorStand.z = spawnZ;
  armorStand.setRotation(0, 90);

  armorStand.setNoGravity(true);
  armorStand.setSilent(true);
  armorStand.setInvisible(true);
  armorStand.setInvulnerable(true);

  armorStand.addTag("power_armor");

  function createArmorPiece(id, modelData) {
    let item = Item.of(id);

    item.set("minecraft:custom_model_data", modelData);
    item.set("minecraft:dyed_color", 15582404);
    item.set("minecraft:unbreakable", {});
    item.set("minecraft:custom_data", { power_armor_piece: true });
    item.set("minecraft:item_name", " ");

    return item;
  }

  armorStand.setItemSlot(
    "feet",
    createArmorPiece("minecraft:leather_boots", 556001),
  );
  armorStand.setItemSlot(
    "legs",
    createArmorPiece("minecraft:leather_leggings", 556001),
  );
  armorStand.setItemSlot(
    "chest",
    createArmorPiece("minecraft:leather_chestplate", 556001),
  );

  armorStand.spawn();

  armorStand.setAttributeBaseValue("generic.scale", 1.2);

  armorStand.persistentData.putInt("suit_battery", 0);

  let interaction = level.createEntity("minecraft:interaction");
  interaction.x = spawnX;
  interaction.y = spawnY + 0.05;
  interaction.z = spawnZ;

  player.tell(interaction.persistentData);
  interaction.persistentData.putFloat("width", 0.5);
  interaction.persistentData.putFloat("height", 1.5);
  interaction.persistentData.putBoolean("response", true);
  player.tell(interaction.persistentData);

  interaction.addTag("power_armor_interactor");
  interaction.spawn();
});

const GUNS = {
  "kubejs:pistol": GunActions.flintlock({
    ammo: "kubejs:cartridge",
    damage: 10,
    distance: 15,
    bulletsPerShot: 1,
    spread: 0.25,
  }),
  "kubejs:musket": GunActions.flintlock({
    ammo: "kubejs:cartridge",
    damage: 20,
    distance: 25,
    bulletsPerShot: 1,
    spread: 0.25,
  }),
  "kubejs:blunderbuss": GunActions.flintlock({
    ammo: "kubejs:buckshot",
    damage: 1,
    distance: 10,
    bulletsPerShot: 10,
    spread: 0.5,
  }),
  "kubejs:revolver": GunActions.revolver({
    ammo: "kubejs:pistol_round",
    damage: 11.5,
    distance: 25,
    spread: 0.1,
  }),
  "kubejs:trapdoor_rifle": GunActions.directLoader({
    ammo: "kubejs:rifle_round",
    capacity: 1,
    damage: 21,
    distance: 55,
    bulletsPerShot: 1,
    spread: 0,
    allowDouble: false,
  }),
  "kubejs:break_action_coachgun": GunActions.directLoader({
    ammo: "kubejs:shotgun_shell",
    capacity: 2,
    damage: 1.8,
    distance: 8,
    bulletsPerShot: 10,
    spread: 0.5,
    allowDouble: true,
  }),
  "kubejs:pump_action_shotgun": GunActions.directLoader({
    ammo: "kubejs:shotgun_shell",
    capacity: 1,
    damage: 1.5,
    distance: 10,
    bulletsPerShot: 10,
    spread: 0.5,
    allowDouble: false,
  }),
  "kubejs:bolt_action_rifle": GunActions.directLoader({
    ammo: "kubejs:rifle_round",
    capacity: 4,
    damage: 16,
    distance: 55,
    bulletsPerShot: 1,
    spread: 0,
    allowDouble: false,
  }),
  "kubejs:handgun": GunActions.magazine({
    magazine: [
      "kubejs:standard_handgun_magazine",
      "kubejs:large_handgun_magazine",
    ],
    muzzle: {
      silencer: "kubejs:handgun_silencer",
      muzzle_brake: "kubejs:handgun_muzzle_brake",
    },
    underbarrel: {},
    stock: {},
    handle: {},
    damage: 9,
    distance: 25,
    spread: 0.1,
  }),
  "kubejs:assault_rifle": GunActions.magazine({
    magazine: [
      "kubejs:standard_assault_rifle_magazine",
      "kubejs:drum_assault_rifle_magazine",
    ],
    muzzle: {
      silencer: "kubejs:assault_rifle_silencer",
      muzzle_brake: "kubejs:assault_rifle_muzzle_brake",
    },
    handle: {},
    underbarrel: {
      grip: "kubejs:assault_rifle_grip",
      handguard: "kubejs:assault_rifle_handguard",
    },
    stock: {
      full_stock: "kubejs:assault_rifle_stock",
    },
    damage: 6.5,
    distance: 25,
    spread: 0.1,
  }),
};

const MAGS = {
  "kubejs:standard_handgun_magazine": MagActions({
    clipSize: 12,
    clipType: "kubejs:pistol_round",
    reloadTime: 10,
  }),
  "kubejs:large_handgun_magazine": MagActions({
    clipSize: 24,
    clipType: "kubejs:pistol_round",
    reloadTime: 15,
  }),
  "kubejs:standard_assault_rifle_magazine": MagActions({
    clipSize: 50,
    clipType: "kubejs:rifle_round",
    reloadTime: 15,
  }),
  "kubejs:drum_assault_rifle_magazine": MagActions({
    clipSize: 100,
    clipType: "kubejs:rifle_round",
    reloadTime: 15,
  }),
};

ItemEvents.rightClicked((e) => {
  const { player, item } = e;

  if (item.id == player.getHeldItem("main_hand").id) {
    let gun = GUNS[item.id];
    if (gun) {
      gun(e);
      return;
    }

    let mag = MAGS[item.id];
    if (mag) {
      mag(e);
      return;
    }
  }
});

EntityEvents.spawned("minecraft:arrow", (e) => {
  e.entity.setCritArrow(false);
});

ItemEvents.rightClicked("minecraft:rotten_flesh", (e) => {
  const { player, level, server } = e;

  let zombie = level.createEntity("minecraft:zombie");
  zombie.setPosition(player.x, player.y, player.z);

  zombie.persistentData.owner = player.uuid.toString();

  zombie.customName = `Телохранитель ${player.username}`;
  zombie.setItemSlot("head", "minecraft:netherite_helmet");

  let teamName = `guard_${player.username}`;
  server.runCommandSilent(`team add ${teamName}`);
  server.runCommandSilent(`team join ${teamName} ${player.username}`);
  server.runCommandSilent(`team join ${teamName} ${zombie.uuid}`);
  server.runCommandSilent(`team modify ${teamName} friendlyFire false`);

  zombie.spawn();
  player.setStatusMessage("Зомби призван");
});

ItemEvents.rightClicked("minecraft:bone", (e) => {
  const { player, level, server } = e;

  let skeleton = level.createEntity("minecraft:skeleton");
  skeleton.setPosition(player.x, player.y, player.z);

  skeleton.persistentData.owner = player.uuid.toString();

  skeleton.customName = `Телохранитель ${player.username}`;
  skeleton.setItemSlot("head", "minecraft:netherite_helmet");

  let teamName = `guard_${player.username}`;
  server.runCommandSilent(`team add ${teamName}`);
  server.runCommandSilent(`team join ${teamName} ${player.username}`);
  server.runCommandSilent(`team join ${teamName} ${skeleton.uuid}`);
  server.runCommandSilent(`team modify ${teamName} friendlyFire false`);

  skeleton.spawn();
});

PlayerEvents.tick((e) => {
  const { player, level, server } = e;
  if (server.tickCount % 10 != 0) return;

  let summons = level
    .getEntities()
    .filter(
      (e) =>
        (e.type == "minecraft:zombie" || e.type == "minecraft:skeleton") &&
        e.persistentData.owner == player.uuid.toString(),
    );

  if (summons.length == 0) return;

  summons.forEach((summon) => {
    if (player) {
      let dx = summon.x - player.x;
      let dy = summon.y - player.y;
      let dz = summon.z - player.z;
      let dist = dx * dx + dy * dy + dz * dz;

      if (dist > 900) {
        summon.setPosition(player.x, player.y, player.z);
      } else if (dist > 16) {
        summon.navigation.moveTo(player.x, player.y, player.z, 1.4);
      }
    }
  });
});

EntityEvents.afterHurt((e) => {
  const { entity, source, level } = e;
  let attacker = source.actual;

  if (!attacker || !attacker.isLiving()) return;

  let victimOwner = entity.isPlayer()
    ? entity.uuid.toString()
    : entity.persistentData.owner;
  let attackerOwner = attacker.isPlayer()
    ? attacker.uuid.toString()
    : attacker.persistentData.owner;

  if (victimOwner && victimOwner == attackerOwner) {
    if (entity.isLiving() && !entity.isPlayer()) {
      entity.setTarget(null);
    }
    return;
  }

  if (entity.isPlayer()) {
    let guards = level
      .getEntities()
      .filter(
        (e) =>
          (e.type == "minecraft:zombie" || e.type == "minecraft:skeleton") &&
          e.persistentData.owner == entity.uuid.toString(),
      );
    guards.forEach((guard) => guard.setTarget(attacker));
  }

  if (attackerOwner) {
    let target = entity;
    if (target.isLiving() && target != attacker) {
      let guards = level
        .getEntities()
        .filter(
          (e) =>
            (e.type == "minecraft:zombie" || e.type == "minecraft:skeleton") &&
            e.persistentData.owner == attackerOwner,
        );
      guards.forEach((guard) => {
        if (guard != target) guard.setTarget(target);
      });
    }
  }
});

EntityEvents.death((e) => {
  const { entity, level } = e;

  let guards = level
    .getEntities()
    .filter(
      (e) =>
        (e.type == "minecraft:zombie" || e.type == "minecraft:skeleton") &&
        e.persistentData.owner !== "",
    );

  guards.forEach((guard) => {
    guard.setTarget(null);
  });
});

// PlayerEvents.tick((e) => {
//   const { player, level, server } = e;
//   if (server.tickCount % 5 != 0) return;

//   level.spawnParticles(
//     "leaves:birch_leaves",
//     false,
//     player.x,
//     player.y + 1.5,
//     player.z,
//     0,
//     0,
//     0,
//     10,
//     1,
//   );

//   let radius = 0.5;
//   let particlesCount = 15;
//   let heightOffset = 0.1;

//   for (let i = 0; i < particlesCount; i++) {
//     let angle = (i * 2 * Math.PI) / particlesCount;

//     let x = radius * Math.cos(angle);
//     let z = radius * Math.sin(angle);

//     level.spawnParticles(
//       "davidparticles:end",
//       true,
//       player.x + x,
//       player.y + heightOffset,
//       player.z + z,
//       0,
//       0,
//       0,
//       1,
//       0,
//     );
//   }
// });

// ItemEvents.rightClicked("minecraft:breeze_rod", (e) => {
//   const { player, level, item } = e;

//   let startPos = player.position().add(0, 1.2, 0);
//   let range = 10.0;

//   let target = level
//     .getEntities()
//     .filter(
//       (entity) =>
//         entity.living &&
//         entity.uuid != player.uuid &&
//         entity.distanceToEntity(player) < range,
//     )[0];

//   if (!target) return;

//   let endPos;
//   if (target) {
//     endPos = target.position().add(0, target.eyeHeight / 1.5, 0);

//     target.potionEffects.add("minecraft:slowness", 40, 2, false, false);
//     target.potionEffects.add("minecraft:glowing", 20, 0, false, false);
//   }

//   spawnLightning(level, startPos, endPos, 6);

//   player.cooldowns.addCooldown(item, 5);
// });

ItemEvents.rightClicked("minecraft:blaze_rod", (e) => {
  const { player, level, item } = e;

  player.addItemCooldown(item, 20);

  let radius = 3.0;
  let particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    let angle = i * ((2 * Math.PI) / particleCount);

    let dx = Math.cos(angle);
    let dz = Math.sin(angle);

    level.spawnParticles(
      "minecraft:flame",
      true,
      player.x,
      player.y + 0.2,
      player.z,
      dx,
      0.1,
      dz,
      0,
      0.5,
    );
  }

  let targets = level
    .getEntities()
    .filter(
      (entity) =>
        entity.living &&
        entity.uuid != player.uuid &&
        entity.distanceToEntity(player) < radius,
    );

  targets.forEach((target) => {
    target.attack(5.0);

    let diffX = target.x - player.x;
    let diffZ = target.z - player.z;

    target.knockback(1, -diffX, -diffZ);
  });

  level.spawnParticles(
    "minecraft:large_smoke",
    true,
    player.x,
    player.y + 0.1,
    player.z,
    0,
    0.1,
    0,
    10,
    0.1,
  );
});

const moonPhaseList = [
  "Full",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
  "New",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
];

ItemEvents.rightClicked((e) => {
  const { level, player, item } = e;

  if (item.id == "minecraft:stick") {
    let ray = player.rayTrace(8);

    if (ray.entity) {
      let entity = ray.entity;
      player.tell(entity);
      entity.attack(player.damageSources().generic(), 2);
    }
    if (ray.block) {
      let block = ray.block;
      player.tell(block);
    }
  }
});

// A general right-click event for any item
// ItemEvents.rightClicked((e) => {
//   const { level, player, item } = e;

//   player.tell("You right-clicked with " + item.id);
//   item.set($DataComponent.get("ammo_count"), 100);
//   player.tell(item.getComponents());
// });

// ItemEvents.rightClicked(e => {
//   let player = e.player;
//   let item = e.item;

//   item.set("bettercombat:preset_id", "bettercombat:katana");
// })

// A specific right-click event for a 'minecraft:stick'
// ItemEvents.rightClicked("minecraft:stick", (e) => {
//   const { level, player, item } = e;

//   player.tell(player.stages);
//   player.stages.add("warrior");
//   player.tell(player.stages.has("warrior"));
//   // Your code here

//   if (!player.cooldowns.isOnCooldown(item)) {
//     player.cooldowns.addCooldown(item, 20);

//     level.server.tell(
//       `Today's moon phase is ${moonPhaseList[level.moonPhase]}`,
//     );

//     player.tell("You clicked with a stick!");

//     let skeletons = level
//       .getEntities()
//       .filter(
//         (entity) =>
//           entity.type == "minecraft:skeleton" &&
//           entity.distanceToEntity(player) < 10,
//       );

//     skeletons.forEach((skeleton) => {
//       let dx = skeleton.x - player.x;
//       let dz = skeleton.z - player.z;

//       skeleton.navigation.moveTo(
//         skeleton.x + dx,
//         skeleton.y,
//         skeleton.z + dz,
//         1.2,
//       );
//     });
//   }

//   event.cancel();
// });

LevelEvents.tick("overworld", (e) => {
  const { moonPhase, dayTime, server } = e;

  if (dayTime % 24000 === 1) {
    server.tell(`Today's moon phase is ${moonPhaseList[moonPhase]}`);
  }
});

PlayerEvents.tick((e) => {
  const { player } = e;

  if (player.shiftKeyDown && player.block.id === "minecraft:tall_grass") {
    if (!player.hasEffect("invisibility")) {
      player.potionEffects.add("invisibility", -1, 0, false, false);
    }
  } else {
    player.removeEffect("invisibility");
  }
});

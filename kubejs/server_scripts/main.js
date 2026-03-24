ItemEvents.rightClicked("kubejs:revolver", (e) => {
  const { item, player, level, hand } = e;

  if (!item.customData.cylinder) {
    item.setCustomData({
      cylinder: [
        "minecraft:air",
        "minecraft:air",
        "minecraft:air",
        "minecraft:air",
        "minecraft:air",
        "minecraft:air",
      ],
      currentIndex: 0,
    });
    player.tell(item.customData);
  }

  let cylinder = item.customData.cylinder,
    currentIndex = parseInt(item.customData.currentIndex);

  let ammoCount = cylinder.filter((item) => item != "minecraft:air").length;

  let offhandItem = player.getHeldItem("off_hand");

  if (
    ammoCount < 6 &&
    offhandItem.id == "kubejs:pistol_round" &&
    cylinder[currentIndex] == "minecraft:air"
  ) {
    cylinder[currentIndex] = offhandItem.id;
    item.setCustomData({
      cylinder: cylinder,
      currentIndex: (currentIndex + 1) % cylinder.length,
    });
    player.cooldowns.addCooldown(item, 10);
    offhandItem.shrink(1);
    global.playSound(level, player, "minecraft:block.wooden_button.click_on");
  } else if (cylinder[currentIndex] == "minecraft:air") {
    item.setCustomData({
      cylinder: cylinder,
      currentIndex: (currentIndex + 1) % cylinder.length,
    });
    global.playSound(level, player, "minecraft:block.tripwire.click_on");
  } else if (
    ammoCount > 0 &&
    ammoCount <= 6 &&
    cylinder[currentIndex] != "minecraft:air"
  ) {
    cylinder[currentIndex] = "minecraft:air";
    item.setCustomData({
      cylinder: cylinder,
      currentIndex: (currentIndex + 1) % cylinder.length,
    });
    global.playSound(level, player, "minecraft:entity.shulker.shoot");
    global.shootBullet(player, 25, 6, 1, 0.1);
  }
});

ItemEvents.rightClicked("kubejs:winchester", (e) => {
  const { item, player, level, hand } = e;

  let tube_magazine = item.customData.tube_magazine || [];

  let ammoCount = tube_magazine.length;

  let offhandItem = player.getHeldItem("off_hand");

  if (ammoCount < 12 && offhandItem.id == "kubejs:rifle_round") {
    tube_magazine.push(offhandItem.id);
    item.setCustomData({ tube_magazine: tube_magazine });
    player.cooldowns.addCooldown(item, 10);
    global.playSound(level, player, "minecraft:block.wooden_button.click_on");
    offhandItem.shrink(1);
  } else if (
    ammoCount > 0 &&
    ammoCount <= 12 &&
    offhandItem.id == "minecraft:air"
  ) {
    tube_magazine.shift();
    item.setCustomData({ tube_magazine: tube_magazine });
    player.cooldowns.addCooldown(item, 10);
    global.playSound(level, player, "minecraft:entity.shulker.shoot");
    global.shootBullet(player, 55, 10, 1, 0);
  } else if (ammoCount == 0) {
    global.playSound(level, player, "minecraft:block.tripwire.click_on");
  }
});

ItemEvents.rightClicked("kubejs:double_barrel_shotgun", (e) => {
  const { item, player, level, hand } = e;

  let chamber = item.customData.chamber || [];

  let ammoCount = chamber.length;

  let offhandItem = player.getHeldItem("off_hand");

  if (ammoCount < 2 && offhandItem.id == "kubejs:shotgun_shell") {
    chamber.push(offhandItem.id);
    item.setCustomData({ chamber: chamber });
    player.cooldowns.addCooldown(item, 10);
    global.playSound(level, player, "minecraft:block.wooden_button.click_on");
    offhandItem.shrink(1);
  } else if (
    ammoCount == 2 &&
    offhandItem.id == "minecraft:air" &&
    player.shiftKeyDown
  ) {
    chamber = [];
    item.setCustomData({ chamber: chamber });
    player.cooldowns.addCooldown(item, 10);
    global.playSound(level, player, "minecraft:entity.shulker.shoot");
    global.shootBullet(player, 8, 1, 20, 0.5);
  } else if (
    ammoCount > 0 &&
    ammoCount <= 2 &&
    offhandItem.id == "minecraft:air"
  ) {
    chamber.shift();
    item.setCustomData({ chamber: chamber });
    player.cooldowns.addCooldown(item, 10);
    global.playSound(level, player, "minecraft:entity.shulker.shoot");
    global.shootBullet(player, 8, 1, 10, 0.5);
  } else if (ammoCount == 0) {
    global.playSound(level, player, "minecraft:block.tripwire.click_on");
  }
});

ItemEvents.rightClicked("kubejs:pistol", (e) => {
  const { item, player, hand } = e;
  let customData = item.customData;
  player.tell(customData);
  let stage = parseInt(customData.stage) || 0;
  player.tell(stage);

  let offhandItem = player.getHeldItem("off_hand");

  if (stage == 0 && offhandItem.id == "minecraft:gunpowder") {
    customData = { stage: 1 };
    offhandItem.count--;
    player.cooldowns.addCooldown(item, 5);
    player.setStatusMessage("Засыпан порох...");
  } else if (stage == 1 && offhandItem.id == "minecraft:iron_nugget") {
    customData = { stage: 2 };
    offhandItem.count--;
    player.cooldowns.addCooldown(item, 5);
    player.setStatusMessage("Пуля вставлена...");
  } else if (stage == 2 && offhandItem.id == "minecraft:stick") {
    customData = { stage: 3 };
    player.cooldowns.addCooldown(item, 5);
    player.setStatusMessage("Оружие взведено!");
  } else if (stage == 3) {
    customData = { stage: 0 };
    player.setStatusMessage("Выстрел");
    let ray = player.rayTrace(8);

    let entity = ray.entity;
    player.tell(entity);
    entity.attack(player.damageSources().generic(), 2);
  }

  player.tell(stage);

  item.customData = customData;
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

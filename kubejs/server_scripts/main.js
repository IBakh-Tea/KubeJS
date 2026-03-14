console.info("Hello, World! (Loaded server example script)");

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

PlayerEvents.tick((e) => {
  const { player, level, server } = e;
  if (server.tickCount % 5 != 0) return;

  level.spawnParticles(
    "apothic_enchanting:enchant_end",
    false,
    player.x,
    player.y + 1.5,
    player.z,
    0,
    0,
    0,
    10,
    1,
  );

  let radius = 0.5;
  let particlesCount = 15;
  let heightOffset = 0.1;

  for (let i = 0; i < particlesCount; i++) {
    let angle = (i * 2 * Math.PI) / particlesCount;

    let x = radius * Math.cos(angle);
    let z = radius * Math.sin(angle);

    level.spawnParticles(
      "minecraft:soul_fire_flame",
      true,
      player.x + x,
      player.y + heightOffset,
      player.z + z,
      0,
      0,
      0,
      1,
      0,
    );
  }
});

function spawnLightning(level, start, end, segments) {
  let currentStart = start;

  for (let i = 1; i <= segments; i++) {
    let fraction = i / segments;

    let tx = start.x() + (end.x() - start.x()) * fraction;
    let ty = start.y() + (end.y() - start.y()) * fraction;
    let tz = start.z() + (end.z() - start.z()) * fraction;

    let chaos = 1;
    let nextPos =
      i == segments
        ? end
        : {
            x: tx + (Math.random() - 0.5) * chaos,
            y: ty + (Math.random() - 0.5) * chaos,
            z: tz + (Math.random() - 0.5) * chaos,
          };

    drawParticleLine(level, currentStart, nextPos);
    currentStart = nextPos;
  }
}

function drawParticleLine(level, p1, p2) {
  let dist = Math.sqrt(
    Math.pow(p2.x - p1.x, 2) +
      Math.pow(p2.y - p1.y, 2) +
      Math.pow(p2.z - p1.z, 2),
  );
  let density = 4;
  let count = Math.max(1, dist * density);

  for (let i = 0; i < count; i++) {
    let x = p1.x + (p2.x - p1.x) * (i / count);
    let y = p1.y + (p2.y - p1.y) * (i / count);
    let z = p1.z + (p2.z - p1.z) * (i / count);

    level.spawnParticles(
      "minecraft:electric_spark",
      true,
      x,
      y,
      z,
      0,
      0,
      0,
      1,
      0,
    );
  }
}

ItemEvents.rightClicked("minecraft:breeze_rod", (e) => {
  const { player, level, item } = e;

  let startPos = player.position().add(0, 1.2, 0);
  let range = 10.0;

  let target = level
    .getEntities()
    .filter(
      (entity) =>
        entity.living &&
        entity.uuid != player.uuid &&
        entity.distanceToEntity(player) < range,
    )[0];

  if (!target) return;

  let endPos;
  if (target) {
    endPos = target.position().add(0, target.eyeHeight / 1.5, 0);

    target.potionEffects.add("minecraft:slowness", 40, 2, false, false);
    target.potionEffects.add("minecraft:glowing", 20, 0, false, false);
  }

  spawnLightning(level, startPos, endPos, 6);

  player.cooldowns.addCooldown(item, 5);
});

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

// const DataComponent = Java.loadClass(
//   "net.rain.kubejs_datacomponent.KubeJSDataComponent$DataComponentAPI",
// );

// DataComponent.registerString("blade_material");

// DataComponent.registerString("handle_material");

// StartupEvents.registry("item", (e) => {
//   global.meleeWeaponTypes.forEach((weapon) => {
//     let item = e
//       .create(weapon.type, "sword")
//       .translationKey("str")
//       .tag("c:tool/melee_weapon")
//       .attackDamageBaseline(weapon.baseDamage)
//       .speedBaseline(weapon.baseSpeed);

//     weapon.class.forEach((cls) => {
//       item.tag(`c:tools/${cls}_weapon`);
//     });
//   });
// });

// global.shootBullet = (player, distance, damage, bulletCount, spread, type) => {
//   let level = player.level;
//   let startPos = player.eyePosition;

//   if (type == "bullet") {
//     for (let i = 0; i < bulletCount; i++) {
//       let offX = (Math.random() - 0.5) * spread;
//       let offY = (Math.random() - 0.5) * spread;
//       let offZ = (Math.random() - 0.5) * spread;

//       let lookVec = player.lookAngle.add(offX, offY, offZ).scale(distance);
//       let endPos = startPos.add(lookVec);

//       let blockHit = level.clip(
//         new ClipContext(
//           startPos,
//           endPos,
//           ClipContext.Block.COLLIDER,
//           ClipContext.Fluid.NONE,
//           player,
//         ),
//       );

//       let finalEndPos = blockHit.location;

//       let distToHit = startPos.distanceTo(finalEndPos);
//       let steps = Math.floor(distToHit * 1.5); // чуть меньше плотность для оптимизации дроби
//       for (let j = 0; j < steps; j++) {
//         let t = j / steps;
//         let px = startPos.x + (finalEndPos.x - startPos.x) * t;
//         let py = startPos.y + (finalEndPos.y - startPos.y) * t;
//         let pz = startPos.z + (finalEndPos.z - startPos.z) * t;
//         level.spawnParticles(
//           "minecraft:smoke",
//           true,
//           px,
//           py,
//           pz,
//           0,
//           0,
//           0,
//           1,
//           0.01,
//         );
//       }

//       let box = player.boundingBox.expandTowards(lookVec).inflate(1.0);
//       let entityHit = null;
//       let minDistance = distToHit;

//       level.getEntitiesWithin(box).forEach((entity) => {
//         if (entity.uuid != player.uuid && entity.living) {
//           let hit = entity.boundingBox.inflate(0.2).clip(startPos, finalEndPos);
//           if (hit.isPresent()) {
//             let d = startPos.distanceTo(hit.get());
//             if (d < minDistance) {
//               minDistance = d;
//               entityHit = entity;
//             }
//           }
//         }
//       });

//       if (entityHit) {
//         entityHit.attack(damage);
//         global.playSound(
//           level,
//           player,
//           "minecraft:entity.experience_orb.pickup",
//         );
//       } else {
//       }
//       player.camera.setRotation(
//         player.yaw + Math.floor(Math.random() * 3) - 1,
//         player.pitch - Math.floor(Math.random() * 5),
//       );
//     }
//   } else if (type == "electric") {
//     let currentStart = startPos;
//     let targets = level
//       .getEntities()
//       .filter(
//         (entity) =>
//           entity.living &&
//           entity.uuid != player.uuid &&
//           entity.distanceToEntity(player) < distance,
//       );

//     if (!targets) return;

//     let endPos;
//     targets.forEach((target) => {
//       if (target) {
//         endPos = target.position().add(0, target.eyeHeight / 1.5, 0);

//         target.potionEffects.add("minecraft:slowness", 40, 2, false, false);
//         target.potionEffects.add("minecraft:glowing", 20, 0, false, false);

//         target.attack(damage);
//       }

//       for (let i = 1; i <= 6; i++) {
//         let fraction = i / 6;

//         let tx = startPos.x() + (endPos.x() - startPos.x()) * fraction;
//         let ty = startPos.y() + (endPos.y() - startPos.y()) * fraction;
//         let tz = startPos.z() + (endPos.z() - startPos.z()) * fraction;

//         let chaos = 1;
//         let nextPos =
//           i == 6
//             ? endPos
//             : {
//                 x: tx + (Math.random() - 0.5) * chaos,
//                 y: ty + (Math.random() - 0.5) * chaos,
//                 z: tz + (Math.random() - 0.5) * chaos,
//               };

//         let dist = Math.sqrt(
//           Math.pow(nextPos.x - currentStart.x, 2) +
//             Math.pow(nextPos.y - currentStart.y, 2) +
//             Math.pow(nextPos.z - currentStart.z, 2),
//         );
//         let density = 4;
//         let count = Math.max(1, dist * density);

//         for (let i = 0; i < count; i++) {
//           let x = currentStart.x + (nextPos.x - currentStart.x) * (i / count);
//           let y = currentStart.y + (nextPos.y - currentStart.y) * (i / count);
//           let z = currentStart.z + (nextPos.z - currentStart.z) * (i / count);

//           level.spawnParticles(
//             "minecraft:electric_spark",
//             true,
//             x,
//             y,
//             z,
//             0,
//             0,
//             0,
//             1,
//             0,
//           );
//         }

//         currentStart = nextPos;
//       }
//     });
//   }
// };

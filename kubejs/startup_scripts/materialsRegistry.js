// e.create("bow_lapis", "bow")
//   .bow((bow) => {
//     bow.onUse((use) => {
//       use.pull((e) => {
//         const { player, bow } = e;
//         player.tell(player.nbt.getString("attributes"));
//         if (player.getProjectile(bow).empty && player.xp > 10) {
//           player.setXp(player.xp - 10);
//           player.give("minecraft:arrow");
//         }
//       });
//       .release((e) => {
//         const { player, arrow } = e;
//         player.tell(player);
//         player.tell(arrow);
//         player.tell(e);
//       });
//     });
//   })
//   .maxDamage(1000);

// e.create("fast_crossbow", "crossbow").crossbow((crossbow) => {
//   crossbow
//     .modifyCrossbow((attribute) => {
//       attribute.fullChargeTick(1).arrowDamage(10).infinity().flamingArrow();
//     })
//     .onArrowHit((arrow) => {
//       arrow.hitBlock((e) => {
//         e.arrow.block.createEntity("lightning_bolt").spawn();
//       });
//     });
// });

// e.create("staff")
//   .unstackable()
//   .use(() => true)
//   .useAnimation("bow")
//   .useDuration(() => 10)
//   .finishUsing((itemstack, level, player) => {
//     let fire_ball = level.createEntity("kubejs:projectile");

//     fire_ball.x = player.x;
//     fire_ball.y = player.y + 1.5;
//     fire_ball.z = player.z;
//     fire_ball.motionX = player.lookAngle.x * 2.0;
//     fire_ball.motionY = player.lookAngle.y * 2.0;
//     fire_ball.motionZ = player.lookAngle.z * 2.0;
//     fire_ball.noGravity = true;

//     fire_ball.spawn();

//     for (let i = 1; i <= 50; i++) {
//       let t = i / 50;
//       let xPos =
//         player.x * (1 - t) + (player.x + player.lookAngle.x * 10) * t;
//       let yPos =
//         (player.y + 1.5) * (1 - t) +
//         (player.y + 1.5 + player.lookAngle.y * 10) * t;
//       let zPos =
//         player.z * (1 - t) + (player.z + player.lookAngle.z * 10) * t;
//       player
//         .getLevel()
//         .addParticle("minecraft:flame", xPos, yPos, zPos, 0, 0, 0);
//     }

//     return itemstack;
//   })
//   .releaseUsing((itemstack, level, entity, tick) => {});

// e.create("pistol")
//   .unstackable()
//   .use((level, player, hand) => {
//     let bulletItems = [Item.of("kubejs:projectile"), Item.of("kubejs:arrow")];

//     return bulletItems.some((bulletItem) => {
//       return player.inventory.find(bulletItem) > 0;
//     });
//   })
//   .useAnimation("bow")
//   .useDuration(() => 10)
//   .finishUsing((item, level, player) => {
//     if (!item.get($DataComponent.get("ammo_count")))
//       item.set($DataComponent.get("ammo_count"), 0);
//     let value = item.get($DataComponent.get("ammo_count"));
//     player.tell(value);

//     if (value > 0) {
//       let bulletIds = ["kubejs:projectile", "kubejs:arrow"];
//       item.set($DataComponent.get("ammo_count"), value - 1);

//       // Ищем первый доступный тип снаряда
//       let foundBulletType = null;
//       let bulletSlot = -1;

//       for (let bulletId of bulletIds) {
//         let bulletItem = Item.of(bulletId);
//         bulletSlot = player.inventory.find(bulletItem);
//         if (bulletSlot > 0) {
//           foundBulletType = bulletId;
//           break;
//         }
//       }

//       // Удаляем один снаряд из инвентаря
//       player.inventory.removeItem(bulletSlot, 1);

//       // Создаем снаряд соответствующего типа
//       let bullet = level.createEntity(foundBulletType);

//       bullet.x = player.x;
//       bullet.y = player.y + 1.5;
//       bullet.z = player.z;
//       bullet.motionX = player.lookAngle.x * 2.0;
//       bullet.motionY = player.lookAngle.y * 2.0;
//       bullet.motionZ = player.lookAngle.z * 2.0;
//       bullet.noGravity = true;

//       bullet.spawn();

//       player
//         .getLevel()
//         .addParticle(
//           "minecraft:campfire_cosy_smoke",
//           player.x,
//           player.y + 1.5,
//           player.z,
//           0,
//           0,
//           0
//         );

//       for (let i = 1; i <= 50; i++) {
//         let t = i / 50;
//         let xPos =
//           player.x * (1 - t) + (player.x + player.lookAngle.x * 10) * t;
//         let yPos =
//           (player.y + 1.5) * (1 - t) +
//           (player.y + 1.5 + player.lookAngle.y * 10) * t;
//         let zPos =
//           player.z * (1 - t) + (player.z + player.lookAngle.z * 10) * t;
//         player
//           .getLevel()
//           .addParticle("minecraft:mycelium", xPos, yPos, zPos, 0, 0, 0);
//       }

//       return item;
//     } else {
//       player.tell("Out of ammo!");
//       return item;
//     }
//   })
//   .releaseUsing((item, level, entity, tick) => {});

// e.create("nuke_soda")
//   .tooltip("Taste of Explosion!")
//   .tooltip("...Inappropriate intake may cause disastrous result.")
//   .use(() => true)
//   .useAnimation("drink")
//   .useDuration((itemstack) => 5)
//   .finishUsing((itemstack, level, entity) => {
//     const effects = entity.potionEffects;
//     effects.add("minecraft:haste", 120 * 20);
//     itemstack.shrink(1);
//     return itemstack;
//   })
//   .releaseUsing((itemstack, level, entity, tick) => {
//     itemstack.shrink(1);
//     console.info(itemstack);
//     console.info(level);
//     console.info(entity);
//     console.info(tick);
//   });

StartupEvents.registry("item", (e) => {
  e
});

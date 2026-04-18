// const SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource");
// const BuiltInRegistries = Java.loadClass(
//   "net.minecraft.core.registries.BuiltInRegistries",
// );
// const ClipContext = Java.loadClass("net.minecraft.world.level.ClipContext");

// e.create("air").translationKey("str");

// global.BULLETS.forEach((bullet) => {
//   e.create(bullet)
//     .translationKey("str")
//     .texture("layer0", `kubejs:item/ammo/${bullet}`);
// });

// Object.entries(global.MAGS).forEach(([key, value]) => {
//   key = key.replace("kubejs:", "");

//   e.create(key)
//     .translationKey("str")
//     .texture("layer0", `kubejs:item/mags/${key}`)
//     .texture("layer1", `kubejs:item/mags/${key}_loaded`)
//     .color((item, index) => {
//       const internal_storage = item.customData.internal_storage;

//       switch (index) {
//         case 0:
//           return "#FFFFFF";
//         case 1:
//           if (internal_storage)
//             if (internal_storage.length == value.clipSize) return "#FFFFFF";
//             else return;
//       }
//     })
//     .barWidth((item) => {
//       const internal_storage = item.customData.internal_storage;
//       return internal_storage
//         ? (internal_storage.length / value.clipSize) * 13
//         : 0;
//     })
//     .barColor(() => Color.WHITE)
//     .useAnimation("none")
//     .useDuration(() => 1)
//     .use(() => true)
//     .finishUsing((item, level, player) => {
//       global.MagActions(value)(item, level, player);

//       return item;
//     })
//     .unstackable();
// });

// global.ATTACHMENTS.forEach((attachment) => {
//   e.create(attachment)
//     .translationKey("str")
//     .texture("layer0", `kubejs:item/attachments/${attachment}`);
// });

// e.create("ramrod")
//   .translationKey("str")
//   .texture("layer0", "kubejs:item/ramrod");

//   e.create("handgun", "crossbow")
//     .crossbow((crossbow) => {
//       crossbow.onUse((use) => {
//         use
//           .pull((e) =>
//             global.GunActions.magazine.reload(global.GUNS.handgun)(e),
//           )
//           .shoot((e) => {
//             e.cancel();
//             global.GunActions.magazine.shoot(global.GUNS.handgun)(e);
//           });
//       });
//     })
//     .barWidth((item) => {
//       const internal_storage = item.customData.internal_storage;
//       let clipSize = global.GUNS.handgun.maxAmmo;

//       switch (item.customData.magazine) {
//         case `kubejs:standard_handgun_magazine`:
//           clipSize = global.GUNS.handgun.maxAmmo;
//           break;
//         case `kubejs:large_handgun_magazine`:
//           clipSize = global.GUNS.handgun.maxAmmo * 2;
//           break;
//       }

//       return internal_storage ? (internal_storage.length / clipSize) * 13 : 0;
//     })
//     .barColor(() => Color.WHITE)
//     .color((item, index) => {
//       const data = item.customData;

//       switch (index) {
//         case 0:
//           if (data.magazine == "kubejs:air") return "#FFFFFF";
//           else return;
//         case 1:
//           if (data.magazine != "kubejs:air") return "#FFFFFF";
//           else return;
//         case 2:
//           if (data.muzzle == `kubejs:handgun_muzzle_brake`) return "#FFFFFF";
//           else return;
//         case 3:
//           if (data.muzzle == `kubejs:handgun_silencer`) return "#FFFFFF";
//           else return;
//         case 4:
//           if (data.receiver == `kubejs:standard_handgun_receiver`)
//             return "#FFFFFF";
//           else return;
//         case 5:
//           if (data.receiver == `kubejs:heavy_handgun_receiver`)
//             return "#FFFFFF";
//           else return;
//         case 6:
//           if (
//             data.magazine == `kubejs:standard_handgun_magazine` &&
//             data.magazine != "kubejs:air"
//           )
//             return "#FFFFFF";
//           else return;
//         case 7:
//           if (
//             data.magazine == `kubejs:large_handgun_magazine` &&
//             data.magazine != "kubejs:air"
//           )
//             return "#FFFFFF";
//           else return;
//       }
//     })
//     .unstackable();

//   e.create("revolver", "crossbow")
//     .crossbow((crossbow) => {
//       crossbow.onUse((use) => {
//         use
//           .pull((e) =>
//             global.GunActions.revolver.reload(global.GUNS.revolver)(e),
//           )
//           .shoot((e) => {
//             e.cancel();
//             global.GunActions.revolver.shoot(global.GUNS.revolver)(e);
//           });
//       });
//     })
//     .barWidth((item) => {
//       const cylinder = item.customData.cylinder;
//       return cylinder
//         ? (cylinder.filter((item) => item != "kubejs:air").length / 6) * 13
//         : 0;
//     })
//     .barColor(() => Color.WHITE)
//     .color((item, index) => {
//       const data = item.customData;

//       switch (index) {
//         case 0:
//           if (!Boolean(parseInt(data.open))) return "#FFFFFF";
//           else return;
//         case 1:
//           if (Boolean(parseInt(data.open))) return "#FFFFFF";
//           else return;
//       }
//     })
//     .unstackable();

//   e.create("bolt_action_rifle", "crossbow")
//     .crossbow((crossbow) => {
//       crossbow.onUse((use) => {
//         use
//           .pull((e) =>
//             global.GunActions.directLoader.reload(
//               global.GUNS.bolt_action_rifle,
//             )(e),
//           )
//           .shoot((e) => {
//             e.cancel();
//             global.GunActions.directLoader.shoot(global.GUNS.bolt_action_rifle)(
//               e,
//             );
//           });
//       });
//     })
//     .barWidth((item) => {
//       const internal_storage = item.customData.internal_storage;
//       return internal_storage ? (internal_storage.length / 6) * 13 : 0;
//     })
//     .barColor(() => Color.WHITE)
//     .color((item, index) => {
//       const data = item.customData;

//       switch (index) {
//         case 0:
//           return "#FFFFFF";
//       }
//     })
//     .unstackable();

//   e.create("assault_rifle", "crossbow")
//     .crossbow((crossbow) => {
//       crossbow.onUse((use) => {
//         use
//           .pull((e) =>
//             global.GunActions.magazine.reload(global.GUNS.assault_rifle)(e),
//           )
//           .shoot((e) => {
//             e.cancel();
//             global.GunActions.magazine.shoot(global.GUNS.assault_rifle)(e);
//           });
//       });
//     })
//     .barWidth((item) => {
//       let internal_storage = item.customData.internal_storage,
//         clipSize = global.GUNS.assault_rifle.maxAmmo;

//       switch (item.customData.magazine) {
//         case "kubejs:drum_assault_rifle_magazine":
//           clipSize = global.GUNS.assault_rifle.maxAmmo * 2;
//           break;
//         case "kubejs:standard_assault_rifle_magazine":
//           clipSize = global.GUNS.assault_rifle.maxAmmo;
//           break;
//       }

//       return internal_storage ? (internal_storage.length / clipSize) * 13 : 0;
//     })
//     .barColor(() => Color.WHITE)
//     .color((item, index) => {
//       const data = item.customData;

//       switch (index) {
//         case 0:
//           return "#FFFFFF";
//         case 1:
//           if (data.magazine == "kubejs:standard_assault_rifle_magazine")
//             return "#FFFFFF";
//           else return;
//         case 2:
//           if (data.magazine == "kubejs:drum_assault_rifle_magazine")
//             return "#FFFFFF";
//           else return;
//         case 3:
//           if (data.underbarrel == "kubejs:assault_rifle_grip") return "#FFFFFF";
//           else return;
//         case 4:
//           if (data.underbarrel == "kubejs:assault_rifle_handguard")
//             return "#FFFFFF";
//           else return;
//         case 5:
//           if (data.stock == "kubejs:assault_rifle_stock") return "#FFFFFF";
//           else return;
//         case 6:
//           if (data.muzzle == "kubejs:assault_rifle_muzzle_brake")
//             return "#FFFFFF";
//           else return;
//         case 7:
//           if (data.muzzle == "kubejs:assault_rifle_silencer") return "#FFFFFF";
//           else return;
//       }
//     })
//     .unstackable();

// [
//   ["trapdoor_rifle", 1],
//   ["break_action_coachgun", 2],
//   ["pump_action_shotgun", 8],
// ].forEach((weapon) => {
//   e.create(weapon[0])
//     .barWidth((item) => {
//       const internal_storage = item.customData.internal_storage;
//       return internal_storage ? (internal_storage.length / weapon[1]) * 13 : 0;
//     })
//     .barColor(() => Color.WHITE)
//     .unstackable();
// });

// global.playSound = (level, player, sound) => {
//   level.playSound(
//     null,
//     player.x,
//     player.y,
//     player.z,
//     BuiltInRegistries.SOUND_EVENT.get(sound),
//     "PLAYERS",
//     1.0,
//     1.0,
//   );
// };

// global.toBool = (val) => val === true || val === 1 || val === "true";

// global.toArray = (val) =>
//   Array.isArray(val) ? val : val ? Array.from(val) : [];

// global.GunUtils = {
//   updateData(item, callback) {
//     const data = item.customData ?? {};
//     try {
//       callback(data);
//     } finally {
//       item.setCustomData(data);
//     }
//   },

//   playSound(level, player, sound) {
//     try {
//       global.playSound(level, player, sound);
//     } catch (err) {
//       console.error(`[GunUtils] playSound failed (${sound}): ${err}`);
//     }
//   },

//   load: (level, player) =>
//     global.GunUtils.playSound(
//       level,
//       player,
//       "minecraft:block.wooden_button.click_on",
//     ),
//   empty: (level, player) =>
//     global.GunUtils.playSound(
//       level,
//       player,
//       "minecraft:block.tripwire.click_on",
//     ),
//   shoot: (level, player) =>
//     global.GunUtils.playSound(level, player, "minecraft:entity.shulker.shoot"),

//   shootBullet: (player, distance, damage, bulletCount, spread, piercing) => {
//     const { level, eyePosition, lookAngle, boundingBox } = player;

//     let maxDist = player.isUnderWater() ? distance / 2 : distance;

//     let muzzlePos = eyePosition.add(lookAngle.scale(0.25));
//     level.spawnParticles(
//       "kubejs:muzzleflash",
//       true,
//       muzzlePos.x,
//       muzzlePos.y - 0.1,
//       muzzlePos.z,
//       0,
//       0,
//       0,
//       1,
//       0,
//     );

//     for (let i = 0; i < bulletCount; i++) {
//       let off = (Math.random() - 0.5) * spread;
//       let dir = lookAngle
//         .add(
//           (Math.random() - 0.5) * spread,
//           (Math.random() - 0.5) * spread,
//           (Math.random() - 0.5) * spread,
//         )
//         .scale(maxDist);
//       let endPos = eyePosition.add(dir);

//       let blockHit = level.clip(
//         new ClipContext(
//           eyePosition,
//           endPos,
//           ClipContext.Block.COLLIDER,
//           ClipContext.Fluid.NONE,
//           player,
//         ),
//       );
//       let finalPoint = blockHit.location;
//       let distToBlock = eyePosition.distanceTo(finalPoint);

//       let searchBox = boundingBox.expandTowards(dir).inflate(1.0);
//       let targets = [];

//       level.getEntitiesWithin(searchBox).forEach((entity) => {
//         if (entity.uuid != player.uuid && entity.living) {
//           let hit = entity.boundingBox
//             .inflate(0.2)
//             .clip(eyePosition, finalPoint);
//           if (hit.isPresent()) {
//             let d = eyePosition.distanceTo(hit.get());
//             if (d < distToBlock) {
//               targets.push({
//                 obj: entity,
//                 distance: d,
//                 hitPos: hit.get(),
//               });
//             }
//           }
//         }
//       });

//       targets.sort((a, b) => a.distance - b.distance);

//       let currentDamage = damage;
//       let hitCount = 0;

//       for (let target of targets) {
//         let victim = target.obj;
//         let hitLoc = target.hitPos;

//         victim.invulnerableTime = 0;

//         let isHeadshot = hitLoc.y - victim.y > victim.eyeHeight * 0.9;
//         let dmgToApply = isHeadshot ? currentDamage * 2 : currentDamage;

//         victim.attack(player.damageSources().playerAttack(player), dmgToApply);

//         if (isHeadshot) {
//           global.playSound(level, player, "minecraft:entity.arrow.hit_player");
//           level.spawnParticles(
//             "minecraft:crit",
//             true,
//             hitLoc.x,
//             hitLoc.y,
//             hitLoc.z,
//             5,
//             0.1,
//             0.1,
//             0.1,
//             0.5,
//           );
//         } else {
//           global.playSound(
//             level,
//             player,
//             "minecraft:entity.experience_orb.pickup",
//           );
//         }

//         hitCount++;

//         if (!piercing) {
//           finalPoint = hitLoc;
//           break;
//         } else {
//           currentDamage *= 0.7;
//           if (hitCount >= 3 || currentDamage < 1) break;
//         }
//       }

//       let trailDist = eyePosition.distanceTo(finalPoint);
//       let steps = Math.floor(trailDist * 2);
//       for (let j = 0; j < steps; j++) {
//         let t = j / steps;
//         let px = eyePosition.x + (finalPoint.x - eyePosition.x) * t;
//         let py = eyePosition.y + (finalPoint.y - eyePosition.y) * t;
//         let pz = eyePosition.z + (finalPoint.z - eyePosition.z) * t;

//         level.spawnParticles(
//           player.isUnderWater() ? "minecraft:bubble" : "kubejs:hitparticle",
//           true,
//           px,
//           py - 0.1,
//           pz,
//           0,
//           0,
//           0,
//           1,
//           0,
//         );
//       }
//     }
//   },
// };

// global.GunActions = {
//   magazine: {
//     shoot: (config) => (e) => {
//       const { crossbow, player, level } = e;

//       if (player.isCreative()) {
//         global.GunUtils.shootBullet(
//           player,
//           config.distance,
//           config.damage,
//           1,
//           config.spread,
//           true,
//         );
//         global.GunUtils.shoot(level, player);
//         return;
//       }

//       global.GunUtils.updateData(crossbow, (data) => {
//         const storage = global.toArray(data.internal_storage);

//         if (storage.length > 0) {
//           storage.shift();
//           data.internal_storage = storage;

//           let finalDamage = config.damage;
//           let finalSpread = config.spread;

//           if (data.receiver === config.receiver.heavy) {
//             finalDamage += 3;
//           }
//           if (data.muzzle === config.muzzle.muzzle_brake) {
//             finalSpread = Math.max(0, finalSpread - 0.05);
//           }

//           global.GunUtils.shootBullet(
//             player,
//             config.distance,
//             finalDamage,
//             1,
//             finalSpread,
//             true,
//           );

//           if (data.muzzle === config.muzzle.silencer) {
//             global.GunUtils.playSound(
//               level,
//               player,
//               "minecraft:block.fire.extinguish",
//             );
//           } else {
//             global.GunUtils.shoot(level, player);
//           }
//         }

//         if (player.shiftKeyDown || storage.length === 0)
//           crossbow.set("minecraft:charged_projectiles", []);
//       });
//     },
//     reload: (config) => (e) => {
//       const { player, crossbow, level } = e,
//         offhand = player.getHeldItem("off_hand");

//       if (player.isCreative()) {
//         e.setResult("allow");
//         return;
//       }

//       global.GunUtils.updateData(crossbow, (data) => {
//         if (!data.internal_storage) {
//           data.internal_storage = [];
//           data.magazine = config.magazine[0];
//           data.receiver = config.receiver.standard || "kubejs:air";
//           data.muzzle = "kubejs:air";
//           data.underbarrel = "kubejs:air";
//           data.stock = "kubejs:air";
//           data.handle = "kubejs:air";
//         }

//         const ATTACHMENT_SLOTS = [
//           {
//             key: "receiver",
//             options: Object.values(config.receiver || {}),
//           },
//           {
//             key: "muzzle",
//             options: Object.values(config.muzzle || {}),
//           },
//           {
//             key: "underbarrel",
//             options: Object.values(config.underbarrel || {}),
//           },
//           {
//             key: "stock",
//             options: Object.values(config.stock || {}),
//           },
//           {
//             key: "handle",
//             options: Object.values(config.handle || {}),
//           },
//         ];

//         let attachmentSwapped = false;
//         for (const slot of ATTACHMENT_SLOTS) {
//           if (slot.options.includes(offhand.id)) {
//             const currentModule = data[slot.key];

//             if (currentModule && currentModule !== "kubejs:air") {
//               player.addItem(Item.of(currentModule));
//             }

//             data[slot.key] = offhand.id;
//             offhand.shrink(1);

//             global.GunUtils.playSound(
//               level,
//               player,
//               "minecraft:block.smithing_table.use",
//             );
//             player.cooldowns.addCooldown(crossbow, 15);
//             e.cancel();
//             attachmentSwapped = true;
//             break;
//           }
//         }
//         if (attachmentSwapped) return;

//         const storage = global.toArray(data.internal_storage);
//         const validMags = config.magazine.filter(Boolean);

//         if (
//           player.shiftKeyDown &&
//           data.magazine !== "kubejs:air" &&
//           offhand.id === "minecraft:air"
//         ) {
//           const magItem = Item.of(data.magazine);
//           magItem.setCustomData({ internal_storage: storage });
//           player.addItem(magItem);

//           data.internal_storage = [];
//           data.magazine = "kubejs:air";

//           global.GunUtils.playSound(
//             level,
//             player,
//             "minecraft:block.iron_door.open",
//           );
//           e.cancel();
//           return;
//         }

//         if (data.magazine === "kubejs:air" && validMags.includes(offhand.id)) {
//           data.internal_storage = global.toArray(
//             offhand.customData?.internal_storage,
//           );
//           data.magazine = offhand.id;
//           offhand.shrink(1);

//           global.GunUtils.playSound(
//             level,
//             player,
//             "minecraft:block.iron_door.close",
//           );
//           player.cooldowns.addCooldown(crossbow, 15);
//           e.cancel();
//           return;
//         }

//         if (storage.length > 0) {
//           e.setResult("allow");
//           // crossbow.set("minecraft:charged_projectiles", [Item.of(storage[0])]);
//         }

//         if (storage.length === 0) {
//           global.GunUtils.empty(level, player);
//           e.cancel();
//         }
//       });
//     },
//   },

//   revolver: {
//     shoot: (config) => (e) => {
//       const { crossbow, player, level } = e;

//       if (player.isCreative()) {
//         global.GunUtils.shootBullet(
//           player,
//           config.distance,
//           config.damage,
//           1,
//           config.spread,
//         );
//         global.GunUtils.shoot(level, player);
//         return;
//       }

//       global.GunUtils.updateData(crossbow, (data) => {
//         const cylinder = global.toArray(data.cylinder),
//           idx = parseInt(data.current_index) % cylinder.length,
//           ammoHere = cylinder[idx],
//           isOpen = global.toBool(data.open);

//         if (player.shiftKeyDown) {
//           data.open = !isOpen;
//           crossbow.set("minecraft:charged_projectiles", []);
//           return;
//         }

//         if (!isOpen && ammoHere !== "kubejs:air") {
//           cylinder[idx] = "kubejs:air";
//           data.cylinder = cylinder;
//           data.current_index = (idx + 1) % cylinder.length;

//           global.GunUtils.shootBullet(
//             player,
//             config.distance,
//             config.damage,
//             1,
//             config.spread,
//           );
//           global.GunUtils.shoot(level, player);
//         }

//         crossbow.set("minecraft:charged_projectiles", [
//           Item.of(data.cylinder[parseInt(data.current_index)]),
//         ]);

//         if (cylinder.filter((item) => item != "kubejs:air").length == 0)
//           crossbow.set("minecraft:charged_projectiles", []);
//       });
//     },
//     reload: (config) => (e) => {
//       const { player, crossbow, level } = e,
//         offhand = player.getHeldItem("off_hand");

//       if (player.isCreative()) {
//         e.setResult("allow");
//         return;
//       }

//       global.GunUtils.updateData(crossbow, (data) => {
//         if (!data.cylinder) {
//           data.open = false;
//           data.cylinder = Array(6).fill("kubejs:air");
//           data.current_index = 0;
//         }

//         const cylinder = global.toArray(data.cylinder),
//           idx = parseInt(data.current_index) % cylinder.length,
//           isOpen = global.toBool(data.open),
//           ammoHere = cylinder[idx];

//         if (player.shiftKeyDown) {
//           data.open = !isOpen;
//           e.cancel();
//           return;
//         }

//         if (isOpen) {
//           if (offhand.id === config.ammo && ammoHere === "kubejs:air") {
//             cylinder[idx] = offhand.id;
//             data.cylinder = cylinder;
//             data.current_index = (idx + 1) % cylinder.length;
//             offhand.shrink(1);

//             player.cooldowns.addCooldown(crossbow, 10);
//             global.GunUtils.load(level, player);
//           }
//           e.cancel();
//           return;
//         }

//         if (!isOpen) {
//           if (ammoHere === "kubejs:air") {
//             data.current_index = (idx + 1) % cylinder.length;
//             global.GunUtils.empty(level, player);
//             e.cancel();
//           } else {
//             crossbow.set("minecraft:charged_projectiles", [
//               Item.of(cylinder[idx]),
//             ]);
//           }
//         }
//       });
//     },
//   },

//   directLoader: {
//     shoot: (config) => (e) => {
//       const { crossbow, player, level } = e,
//         offhand = player.getHeldItem("off_hand");

//       if (player.isCreative()) {
//         global.GunUtils.shootBullet(
//           player,
//           config.distance,
//           config.damage,
//           1,
//           config.spread,
//         );
//         global.GunUtils.shoot(level, player);
//         return;
//       }

//       global.GunUtils.updateData(crossbow, (data) => {
//         const storage = global.toArray(data.internal_storage),
//           isOpen = global.toBool(data.open);

//         if (player.shiftKeyDown) {
//           data.open = !isOpen;
//           crossbow.set("minecraft:charged_projectiles", []);
//           return;
//         }

//         if (storage.length === 0) {
//           crossbow.set("minecraft:charged_projectiles", []);
//           return;
//         }

//         if (!isOpen && storage.length > 0 && offhand.id === "minecraft:air") {
//           const isDouble =
//               config.allowDouble && player.shiftKeyDown && storage.length >= 2,
//             count = isDouble ? 2 : 1;

//           storage.shift();
//           if (isDouble) storage.shift();

//           data.internal_storage = storage;

//           global.GunUtils.shootBullet(
//             player,
//             config.distance,
//             config.damage,
//             config.bulletsPerShot * count,
//             config.spread,
//           );
//           global.GunUtils.shoot(level, player);
//         }
//       });
//     },
//     reload: (config) => (e) => {
//       const { crossbow, player, level } = e,
//         offhand = player.getHeldItem("off_hand");

//       if (player.isCreative()) {
//         e.setResult("allow");
//         return;
//       }

//       global.GunUtils.updateData(crossbow, (data) => {
//         if (!data.internal_storage) {
//           data.open = false;
//           data.internal_storage = [];
//         }

//         const storage = global.toArray(data.internal_storage),
//           isOpen = global.toBool(data.open);

//         if (player.shiftKeyDown) {
//           data.open = !isOpen;
//           e.cancel();
//           return;
//         }

//         if (
//           isOpen &&
//           storage.length < config.capacity &&
//           offhand.id === config.ammo
//         ) {
//           storage.push(offhand.id);
//           data.internal_storage = storage;
//           offhand.shrink(1);
//           player.cooldowns.addCooldown(crossbow, 10);
//           global.GunUtils.load(level, player);
//         }

//         if (!isOpen) {
//           if (storage.length == 0) {
//             global.GunUtils.empty(level, player);
//           } else {
//             crossbow.set("minecraft:charged_projectiles", [
//               Item.of(storage[0]),
//             ]);
//           }
//         }
//       });
//     },
//   },
//   // flintlock: (config) => (item, level, player) => {
//   //   const offhand = player.getHeldItem("off_hand");

//   //   global.GunUtils.updateData(item, (data) => {
//   //     if (data.stage == null) data.stage = 0;

//   //     switch (parseInt(data.stage)) {
//   //       case 0:
//   //         if (offhand.id === "minecraft:gunpowder") {
//   //           data.stage = 1;
//   //           offhand.shrink(1);
//   //           player.cooldowns.addCooldown(item, 5);
//   //         } else if (offhand.id === config.ammo) {
//   //           data.stage = 2;
//   //           offhand.shrink(1);
//   //           player.cooldowns.addCooldown(item, 10);
//   //         }
//   //         break;

//   //       case 1:
//   //         if (
//   //           offhand.count < config.bulletsPerShot ||
//   //           (offhand.id !== "kubejs:copper_roundshot" &&
//   //             offhand.id !== "kubejs:iron_roundshot")
//   //         ) {
//   //           e.cancel();
//   //           return;
//   //         }
//   //         data.stage = 2;
//   //         offhand.shrink(config.bulletsPerShot);
//   //         player.cooldowns.addCooldown(item, 5);
//   //         break;

//   //       case 2:
//   //         if (offhand.id !== "kubejs:ramrod") {
//   //           e.cancel();
//   //           return;
//   //         }
//   //         data.stage = 3;
//   //         player.cooldowns.addCooldown(item, 5);
//   //         break;

//   //       case 3:
//   //         if (offhand.id !== "kubejs:air") {
//   //           e.cancel();
//   //           return;
//   //         }
//   //         global.GunUtils.shootBullet(
//   //           player,
//   //           config.distance,
//   //           config.damage,
//   //           config.bulletsPerShot,
//   //           config.spread,
//   //         );
//   //         global.GunUtils.shoot(level, player);
//   //         data.stage = 0;
//   //         player.cooldowns.addCooldown(item, 15);
//   //         break;
//   //     }
//   //   });
//   // },
// };

// global.MagActions = (config) => (item, level, player) => {
//   const offhand = player.getHeldItem("off_hand");

//   global.GunUtils.updateData(item, (data) => {
//     if (!data.internal_storage) data.internal_storage = [];

//     const storage = global.toArray(data.internal_storage);

//     if (storage.length < config.clipSize && offhand.id === config.clipType) {
//       storage.push(offhand.id);
//       data.internal_storage = storage;
//       offhand.shrink(1);
//       player.cooldowns.addCooldown(item, config.reloadTime);
//       global.GunUtils.load(level, player);
//     }
//   });
// };

// global.GUNS = {
//   pistol: {
//     ammo: "kubejs:cartridge",
//     damage: 10,
//     distance: 15,
//     bulletsPerShot: 1,
//     spread: 0.25,
//   },
//   musket: {
//     ammo: "kubejs:cartridge",
//     damage: 20,
//     distance: 25,
//     bulletsPerShot: 1,
//     spread: 0.25,
//   },
//   blunderbuss: {
//     ammo: "kubejs:buckshot",
//     damage: 1,
//     distance: 10,
//     bulletsPerShot: 10,
//     spread: 0.5,
//   },
//   revolver: {
//     ammo: "kubejs:44_round",
//     damage: 11.5,
//     distance: 50,
//     spread: 0,
//   },
//   pipe_revolver: {
//     ammo: "kubejs:44_round",
//     damage: 11.5,
//     distance: 50,
//     spread: 0,
//   },
//   trapdoor_rifle: {
//     ammo: "kubejs:rifle_round",
//     capacity: 1,
//     damage: 21,
//     distance: 55,
//     bulletsPerShot: 1,
//     spread: 0,
//     allowDouble: false,
//   },
//   break_action_coachgun: {
//     ammo: "kubejs:shotgun_shell",
//     capacity: 2,
//     damage: 1.8,
//     distance: 8,
//     bulletsPerShot: 10,
//     spread: 0.5,
//     allowDouble: true,
//   },
//   pump_action_shotgun: {
//     ammo: "kubejs:shotgun_shell",
//     capacity: 1,
//     damage: 1.5,
//     distance: 10,
//     bulletsPerShot: 10,
//     spread: 0.5,
//     allowDouble: false,
//   },
//   bolt_action_rifle: {
//     ammo: "kubejs:308_round",
//     capacity: 6,
//     damage: 16,
//     distance: 100,
//     bulletsPerShot: 1,
//     spread: 0,
//     allowDouble: false,
//   },
//   handgun: {
//     magazine: [
//       "kubejs:standard_handgun_magazine",
//       "kubejs:large_handgun_magazine",
//     ],
//     receiver: {
//       standard: "kubejs:standard_handgun_receiver",
//       heavy: "kubejs:heavy_handgun_receiver",
//     },
//     muzzle: {
//       silencer: "kubejs:handgun_silencer",
//       muzzle_brake: "kubejs:handgun_muzzle_brake",
//     },
//     underbarrel: {},
//     stock: {},
//     handle: {},
//     damage: 9,
//     distance: 50,
//     spread: 0,
//     maxAmmo: 12,
//   },
//   pipe_gun: {
//     magazine: [
//       "kubejs:standard_pipe_gun_magazine",
//       "kubejs:large_pipe_gun_magazine",
//     ],
//     receiver: {
//       standard: "kubejs:standard_pipe_gun_receiver",
//       heavy: "kubejs:heavy_pipe_gun_receiver",
//     },
//     muzzle: {
//       silencer: "kubejs:pipe_gun_silencer",
//       muzzle_brake: "kubejs:pipe_gun_muzzle_brake",
//     },
//     underbarrel: {},
//     stock: {},
//     handle: {},
//     damage: 9,
//     distance: 50,
//     spread: 0,
//     maxAmmo: 12,
//   },
//   assault_rifle: {
//     magazine: [
//       "kubejs:standard_assault_rifle_magazine",
//       "kubejs:drum_assault_rifle_magazine",
//     ],
//     muzzle: {
//       silencer: "kubejs:assault_rifle_silencer",
//       muzzle_brake: "kubejs:assault_rifle_muzzle_brake",
//     },
//     receiver: {
//       standard: "kubejs:standard_assault_rifle_receiver",
//       heavy: "kubejs:heavy_assault_rifle_receiver",
//     },
//     handle: {},
//     underbarrel: {
//       grip: "kubejs:assault_rifle_grip",
//       handguard: "kubejs:assault_rifle_handguard",
//     },
//     stock: {
//       full_stock: "kubejs:assault_rifle_stock",
//     },
//     damage: 6.5,
//     distance: 50,
//     spread: 0,
//     maxAmmo: 50,
//   },
// };

// global.MAGS = {
//   "kubejs:standard_handgun_magazine": {
//     clipSize: 12,
//     clipType: "kubejs:10mm_round",
//     reloadTime: 10,
//   },
//   "kubejs:large_handgun_magazine": {
//     clipSize: 24,
//     clipType: "kubejs:10mm_round",
//     reloadTime: 15,
//   },
//   "kubejs:standard_assault_rifle_magazine": {
//     clipSize: 50,
//     clipType: "kubejs:556_round",
//     reloadTime: 15,
//   },
//   "kubejs:drum_assault_rifle_magazine": {
//     clipSize: 100,
//     clipType: "kubejs:556_round",
//     reloadTime: 15,
//   },
// };

// global.BULLETS = [
//   "10mm_round",
//   "38_round",
//   "44_round",
//   "45_round",
//   "50_round",
//   "308_round",
//   "556_round",
//   "shotgun_shell",
//   "fusion_cell",
// ];

// global.ATTACHMENTS = [
//   "handgun_silencer",
//   "handgun_muzzle_brake",
//   "assault_rifle_grip",
//   "assault_rifle_handguard",
//   "assault_rifle_stock",
//   "assault_rifle_muzzle_brake",
//   "assault_rifle_silencer",
// ];

// global.testFunc = (e) => {
//   const { level, player, hand, crossbow } = e;
//   // console.log(level.time);
//   // console.log(hand);

//   if (level.isClientSide()) console.log(level);

//   if (level.time % 5 == 0) {
//     crossbow.set("minecraft:charged_projectiles", [Item.of("minecraft:arrow")]);
//   }
// };

// StartupEvents.registry("item", (e) => {
//   global.meleeWeaponTypes.forEach((weapon) => {
//     global.baseMaterials.forEach((main) => {
//       e.create(`${main.material}_${weapon.type}`, "sword")
//         .translationKey("str")
//         .parentModel(`kubejs:item/${weapon.type}`)
//         .texture("layer0", `kubejs:item/${weapon.type}/hilt`)
//         .texture(
//           "layer1",
//           `kubejs:item/${weapon.type}/${
//             main.material.includes("netherite") ? "netherite_" : ""
//           }blade`,
//         )
//         .color((item, index) => {
//           let handleMaterial = parseInt(item.customData.handleMaterial);
//           switch (index) {
//             case 0:
//               return handleMaterial
//                 ? global.handleMaterials[handleMaterial].color
//                 : global.handleMaterials[0].color;
//             case 1:
//               return "#FFFFFF";
//           }
//         })
//         .tier(main.material)
//         .tag("c:tools/melee_weapon")
//         .attackDamageBaseline(weapon.baseDamage)
//         .speedBaseline(weapon.baseSpeed);
//     });
//   });

//   global.rangeWeaponsTypes.forEach((weapon) => {
//     let registryType = weapon.type == "crossbow" ? "crossbow" : "bow";
//     let item = e
//       .create(`${weapon.type}`, registryType)
//       .unstackable()
//       .translationKey("str")
//       .color((item, index) => {
//         let handleMaterial = parseInt(item.customData.handleMaterial);
//         switch (index) {
//           case 0:
//             if (weapon.type == "crossbow")
//               return handleMaterial
//                 ? global.handleMaterials[handleMaterial].color
//                 : global.handleMaterials[0].color;
//             else
//               return handleMaterial
//                 ? global.handleMaterials[handleMaterial].color
//                 : "#CCCCCC";
//           case 1:
//             return handleMaterial
//               ? global.handleMaterials[handleMaterial].color
//               : global.handleMaterials[0].color;
//           case 2:
//             return "#FFFFFF";
//           case 3:
//             return "#CCCCCC";
//         }
//       })
//       .tag("c:enchantables")
//       .tag("c:tools")
//       .tag(`c:tools/${registryType}`)
//       .tag("c:tools/ranged_weapons")
//       .tag(`minecraft:enchantable/${registryType}`)
//       .tag("minecraft:enchantable/durability")
//       .tag("minecraft:enchantable/vanishing");

//     if (weapon.type == "crossbow") {
//       item.crossbow((crossbow) => {
//         crossbow.onUse((use) => {
//           use.pull((e) => {
//             const { player, crossbow } = e;

//             if (player.getProjectile(crossbow).empty && player.xp > 10) {
//               player.setXp(player.xp - 10);
//               player.addItem("minecraft:arrow");
//             }
//           });
//         });
//       });
//     } else {
//       item.bow((bow) => {
//         bow.onUse((use) => {
//           use.pull((e) => {
//             const { player, bow } = e;

//             if (player.getProjectile(bow).empty && player.xp > 10) {
//               player.setXp(player.xp - 10);
//               player.addItem("minecraft:arrow");
//             }
//           });
//         });
//       });
//     }
//   });

//   global.flintlockWeaponsTypes.forEach((weapon) => {
//     e.create(weapon.type, "crossbow")
//       .translationKey("str")
//       .unstackable()
//       .crossbow((crossbow) => {
//         crossbow.modifyCrossbow((attribute) =>
//           attribute.arrowSpeed(10).arrowDamage(weapon.damage).pierce(1),
//         );
//       });
//   });
// });

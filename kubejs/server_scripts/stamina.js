// // Загружаем конфиг
// const C = global.StaminaConfig;

// const Stamina = {
//   getMaxPossible(player) {
//     let max = Math.ceil(player.maxHealth) * C.staminaPerHalfHeart;
//     max += player.getAttribute("kubejs:bonus_stamina").value;

//     const armor = player.getAttribute("minecraft:generic.armor").value;
//     max *= 1.0 - armor * C.percentageReductionPerArmorPoint;
//     return max;
//   },

//   getMax(player) {
//     const maxPossible = this.getMaxPossible(player);
//     if (C.boundToMaxHealth) {
//       return maxPossible;
//     }
//     return maxPossible * (player.health / player.maxHealth);
//   },

//   get(player) {
//     return player.persistentData.getFloat("stamina_value");
//   },

//   set(player, amount) {
//     const max = this.getMax(player);
//     const clampedAmount = Math.max(0, Math.min(amount, max));
//     player.persistentData.putFloat("stamina_value", clampedAmount);
//     return clampedAmount;
//   },

//   isLocked(player) {
//     return player.persistentData.getBoolean("stamina_locked");
//   },

//   lock(player) {
//     player.persistentData.putBoolean("stamina_locked", true);
//   },

//   unlock(player) {
//     player.persistentData.putBoolean("stamina_locked", false);
//   },

//   consume(player, amount) {
//     if (amount <= 0) return;
//     const current = this.get(player);
//     const newStamina = this.set(player, current - amount);
//     if (newStamina <= 0) {
//       this.lock(player);
//     }
//     if (this.isLocked(player) && this.canConsumeHunger(player)) {
//       player.addExhaustion(C.consumeHungerRatio * amount);
//     }
//   },

//   regen(player, amount) {
//     if (amount <= 0) return;
//     const current = this.get(player);
//     this.set(player, current + amount);
//   },

//   canSprint(player) {
//     return !this.isLocked(player) || this.canConsumeHunger(player);
//   },

//   canConsumeHunger(player) {
//     return C.consumeHungerRatio > 0 && player.foodLevel > 0;
//   },

//   isInCombat(player) {
//     const gameTime = player.level.gameTime;
//     const lastHurt = player.persistentData.getLong("stamina_last_hurt");
//     const lastHit = player.persistentData.getLong("stamina_last_hit");
//     return gameTime - lastHurt < 300 || gameTime - lastHit < 300;
//   },

//   // Синхронизация с клиентом для HUD
//   sync(player) {
//     player.sendData("stamina_sync", {
//       current: this.get(player),
//       max: this.getMax(player),
//       locked: this.isLocked(player),
//     });
//   },
// };

// // --- Логика замедления ---

// function applySlowdown(player) {
//   const moveSpeed = player.getAttribute("minecraft:generic.movement_speed");
//   const swimSpeed = player.getAttribute("neoforge:swim_speed");

//   // Сначала удаляем все модификаторы, чтобы избежать дублирования
//   //   moveSpeed.removeModifier(C.lockSlowdownUUID);
//   //   swimSpeed.removeModifier(C.lockSlowdownUUID);
//   //   moveSpeed.removeModifier(C.sprintSlowdownUUID);
//   //   swimSpeed.removeModifier(C.sprintSlowdownUUID);

//   // Замедление при блокировке
//   if (Stamina.isLocked(player) && C.slowdown.whenLocked.enabled) {
//     moveSpeed.addTransientModifier(
//       C.lockSlowdownUUID,
//       "Stamina locked slowdown",
//       -C.slowdown.whenLocked.amount,
//       "multiply_total",
//     );
//     swimSpeed.addTransientModifier(
//       C.lockSlowdownUUID,
//       "Stamina locked slowdown",
//       -C.slowdown.whenLocked.amount,
//       "multiply_total",
//     );
//   }

//   // Замедление при спринте с низкой выносливостью
//   const stamina = Stamina.get(player);
//   const maxStamina = Stamina.getMax(player);
//   if (
//     player.sprinting &&
//     (stamina < C.slowdown.sprinting.thresholdFlat ||
//       (maxStamina > 0 && stamina / maxStamina < C.slowdown.sprinting.threshold))
//   ) {
//     moveSpeed.addTransientModifier(
//       C.sprintSlowdownUUID,
//       "Stamina sprinting slowdown",
//       -C.slowdown.sprinting.amount,
//       "multiply_total",
//     );
//     swimSpeed.addTransientModifier(
//       C.sprintSlowdownUUID,
//       "Stamina swimming slowdown",
//       -C.slowdown.sprinting.amount,
//       "multiply_total",
//     );
//   }
// }

// // --- Обработчики событий ---

// // Главный тик игрока
// PlayerEvents.tick((e) => {
//   const { player } = e;

//   if (!player.isAlive() || player.isCreative() || player.isSpectator()) {
//     console.log(player);
//     return;
//   }

//   // Инициализация данных при первом входе
//   if (!player.persistentData.contains("stamina_value")) {
//     Stamina.set(player, Stamina.getMax(player));
//     player.persistentData.putBoolean("stamina_locked", false);
//   }

//   player.tell(player.persistentData.stamina_value);

//   const maxStamina = Stamina.getMax(player);
//   const currentStamina = Stamina.get(player);
//   const isLocked = Stamina.isLocked(player);
//   let needsSync = false;

//   // Потребление
//   if (player.isSprinting()) {
//     let toConsume = player.isSwimming()
//       ? C.swimConsumption
//       : C.sprintConsumption;
//     if (player.isSwimming() && player.hasEffect("minecraft:conduit_power")) {
//       toConsume *= C.conduitSwimmingModifier;
//     }
//     if (!Stamina.isInCombat(player)) {
//       toConsume *= C.outOfCombatMultiplier;
//     }
//     if (toConsume > 0) {
//       Stamina.consume(player, toConsume);
//       needsSync = true;
//     }
//   }
//   // Регенерация
//   else if (currentStamina < maxStamina) {
//     let toRegen = C.regenPerTick;
//     if (isLocked) {
//       toRegen *= C.modifierWhenLocked;
//     }
//     if (
//       player.isInWater() &&
//       (!player.onGround() || !C.modifierWhenInWaterWhenOffGround)
//     ) {
//       toRegen *= C.modifierWhenInWater;
//     }
//     const armor = player.getAttribute("minecraft:generic.armor").value;
//     toRegen *= 1.0 - armor * C.reductionPerArmorPoint;

//     if (toRegen > 0) {
//       Stamina.regen(player, toRegen);
//       needsSync = true;
//     }
//   }

//   // Логика блокировки и разблокировки
//   const maxPossible = Stamina.getMaxPossible(player);
//   if (
//     isLocked &&
//     maxStamina > 0 &&
//     currentStamina / maxStamina >= C.unlockAtHealthRatio
//   ) {
//     Stamina.unlock(player);
//     needsSync = true;
//   } else if (
//     !isLocked &&
//     (player.maxHealth <= C.lockBelowMaxHealth ||
//       (maxPossible > 0 && maxStamina / maxPossible <= C.lockBelowHealthRatio))
//   ) {
//     Stamina.set(player, 0);
//     Stamina.lock(player);
//     needsSync = true;
//   }

//   // Применение замедления
//   //   applySlowdown(player);

//   // Синхронизация с клиентом, если были изменения
//   if (needsSync || player.tickCount % 20 === 0) {
//     // Периодическая синхронизация для надежности
//     Stamina.sync(player);
//   }
// });

// // // Отмена спринта
// // PlayerEvents.sprint((event) => {
// //   if (C.disableSprinting && !event.player.isSwimming()) {
// //     event.cancel();
// //     return;
// //   }
// //   if (C.disableSwimming && event.player.isSwimming()) {
// //     event.cancel();
// //     return;
// //   }
// //   if (!Stamina.canSprint(event.player)) {
// //     event.cancel();
// //   }
// // });

// // // Потребление при прыжке
// // PlayerEvents.jump((event) => {
// //   const player = event.player;
// //   if (player.level.isClientSide || C.jumpConsumption <= 0) return;
// //   Stamina.consume(player, C.jumpConsumption);
// //   Stamina.sync(player);
// // });

// // // Потребление/замедление при добыче
// // PlayerEvents.breakSpeed((event) => {
// //   if (C.mineConsumption <= 0) return;
// //   const player = event.player;
// //   if (Stamina.isLocked(player)) {
// //     event.newSpeed *= 0.5;
// //   } else if (Stamina.get(player) > 0) {
// //     Stamina.consume(player, C.mineConsumption);
// //     // Не нужно синхронизировать каждый тик добычи, основной тик это сделает
// //   }
// // });

// // // Запись времени боя
// // EntityEvents.hurt((event) => {
// //   if (event.entity.isPlayer()) {
// //     event.entity.persistentData.putLong(
// //       "stamina_last_hurt",
// //       event.entity.level.gameTime,
// //     );
// //   }
// //   if (event.source.player) {
// //     event.source.player.persistentData.putLong(
// //       "stamina_last_hit",
// //       event.source.player.level.gameTime,
// //     );
// //   }
// // });

// // // Сброс при респавне
// // PlayerEvents.respawn((event) => {
// //   // Небольшая задержка, чтобы игрок полностью загрузился
// //   event.server.scheduleInTicks(1, () => {
// //     Stamina.set(event.player, Stamina.getMax(event.player));
// //     Stamina.unlock(event.player);
// //     Stamina.sync(event.player);
// //   });
// // });

// // // Полная синхронизация при смене измерения
// // PlayerEvents.changedDimension((event) => {
// //   event.server.scheduleInTicks(1, () => {
// //     Stamina.sync(event.player);
// //   });
// // });

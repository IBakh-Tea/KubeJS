StartupEvents.registry("item", (e) => {
  const heightTierWeapons = [
      "scythe",
      "greatsword",
      "sickle",
      "claw",
      "twinblade",
    ],
    lowTierMaterial = ["bone", "flint", "copper"];

  global.meleeWeaponTypes.forEach((weapon) => {
    global.handleMaterials.forEach((handle) => {
      global.baseMaterials.forEach((main) => {
        if (
          heightTierWeapons.includes(weapon.type) &&
          lowTierMaterial.includes(main.material)
        )
          return;
        let item = e
          .create(`${handle.material}_${main.material}_${weapon.type}`, "sword")
          .translationKey("str")
          .parentModel(`kubejs:item/base/${weapon.type}`)
          .texture("layer0", `kubejs:item/${weapon.type}/hilt`)
          .texture(
            "layer1",
            `kubejs:item/${weapon.type}/${
              main.material.includes("netherite") ? "netherite_" : ""
            }blade`,
          )
          .color(0, handle.color)
          .color(1, main.color)
          .tooltip(global.listToString(weapon.class))
          .tooltip(`Handle: ${global.capitalizeFirstLetter(handle.material)}`)
          .tier(main.material)
          .tag("c:tools/melee_weapon")
          .attackDamageBaseline(weapon.baseDamage)
          .speedBaseline(weapon.baseSpeed);

        weapon.class.forEach((cls) => {
          item.tag(`c:tools/${cls}_weapon`);
        });
      });
    });
  });

  global.rangeWeaponsTypes.forEach((weapon) => {
    global.handleMaterials.forEach((stave) => {
      let registryType = weapon.type == "crossbow" ? "crossbow" : "bow";
      let item = e
        .create(`${stave.material}_${weapon.type}`, registryType)
        .unstackable()
        .translationKey("str")
        .color(
          0,
          weapon.type == "crossbow"
            ? stave.color
            : global.stringMaterials.color,
        )
        .color(1, stave.color)
        .tag("c:enchantables")
        .tag("c:tools")
        .tag(`c:tools/${registryType}`)
        .tag("c:tools/ranged_weapons")
        .tag(`minecraft:enchantable/${registryType}`)
        .tag("minecraft:enchantable/durability")
        .tag("minecraft:enchantable/vanishing");

      if (weapon.type == "crossbow") {
        item.crossbow((crossbow) => {
          crossbow.onUse((use) => {
            use.pull((e) => {
              const { player, crossbow } = e;

              if (player.getProjectile(crossbow).empty && player.xp > 10) {
                player.setXp(player.xp - 10);
                player.give("minecraft:arrow");
              }
            });
          });
        });
      } else {
        item.bow((bow) => {
          bow.onUse((use) => {
            use
              .pull((e) => {
                const { player, bow } = e;

                if (player.getProjectile(bow).empty && player.xp > 10) {
                  player.setXp(player.xp - 10);
                  player.give("minecraft:arrow");
                }
              })
              .release((e) => {
                const { player, arrow } = e;
                console.log(arrow);
              });
          });
        });
      }
    });
  });

  global.handleMaterials.forEach((stock) => {
    global.baseMaterials.forEach((stave) => {
      if (lowTierMaterial.includes(stave.material)) return;
      e.create(`${stock.material}_${stave.material}_arbalest`, "crossbow")
        .unstackable()
        .translationKey("str")
        .color(0, stock.color)
        .color(1, stave.color)
        .color(2, stave.color)
        .color(3, global.stringMaterials.color)
        .tag("c:enchantables")
        .tag("c:tools")
        .tag("c:tools/crossbow")
        .tag("c:tools/ranged_weapons")
        .tag("minecraft:enchantable/crossbow")
        .tag("minecraft:enchantable/durability")
        .tag("minecraft:enchantable/vanishing")
        .crossbow((crossbow) => {
          crossbow.onUse((use) => {
            use.pull((e) => {
              const { player, crossbow } = e;

              if (player.getProjectile(crossbow).empty && player.xp > 10) {
                player.setXp(player.xp - 10);
                player.give("minecraft:arrow");
              }
            });
          });
        });
    });
  });

  ["pistol", "musket"].forEach((type) => {
    global.handleMaterials.forEach((handle) => {
      global.baseMaterials.forEach((barrel) => {
        if (lowTierMaterial.includes(barrel.material)) return;
        e.create(`${handle.material}_${barrel.material}_${type}`, "crossbow")
          .unstackable()
          .translationKey("str")
          .color(0, handle.color)
          .color(1, barrel.color)
          .tag("c:enchantables")
          .tag("c:tools")
          .tag("c:tools/crossbow")
          .tag("c:tools/ranged_weapons")
          .tag("minecraft:enchantable/crossbow")
          .tag("minecraft:enchantable/durability")
          .tag("minecraft:enchantable/vanishing")
          .crossbow((crossbow) => {
            crossbow
              .modifyCrossbow((attr) => {
                attr.fullChargeTick(20).ammo((item) => {
                  return item.is(Item.of("kubejs:bullet"));
                });
              })
              .onUse((use) => {
                use
                  .pull((e) => {
                    const { player, crossbow } = e;

                    if (
                      player.getProjectile(crossbow).empty &&
                      player.xp > 10
                    ) {
                      player.setXp(player.xp - 10);
                      player.give("kubejs:bullet");
                    }
                  })
                  .shoot((e) => {
                    const { player, arrowStack, arrow } = e;

                    console.log(player);
                    console.log(arrowStack);
                    console.log(arrow);

                    player
                      .getLevel()
                      .addParticle(
                        "minecraft:poof",
                        player.x,
                        player.y + 1.5,
                        player.z,
                        0,
                        0,
                        0,
                      );
                  });
              });
          });
      });
    });
  });

  [
    "spear",
    "crossbow",
    "eat",
    "spyglass",
    "block",
    "none",
    "bow",
    "drink",
  ].forEach((animation) => {
    e.create(`item_${animation}`)
      .texture("minecraft:item/firework_rocket")
      .glow(true)
      .unstackable()
      .useAnimation(animation)
      .useDuration(() => 64)
      .use(() => true);
  });

  e.create("test")
    .useAnimation("block")
    .useDuration(() => 5)
    .use(() => true)
    .finishUsing((itemstack, level, entity) => {
      const effects = entity.potionEffects;

      effects.add("minecraft:haste", 2, 1);

      return itemstack;
    });
});

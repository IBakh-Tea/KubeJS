StartupEvents.registry("item", (e) => {
  global.meleeWeaponTypes.forEach((weapon) => {
    global.baseMaterials.forEach((main) => {
      e.create(`${main.material}_${weapon.type}`, "sword")
        .translationKey("str")
        .parentModel(`kubejs:item/${weapon.type}`)
        .texture("layer0", `kubejs:item/${weapon.type}/hilt`)
        .texture(
          "layer1",
          `kubejs:item/${weapon.type}/${
            main.material.includes("netherite") ? "netherite_" : ""
          }blade`,
        )
        .color((item, index) => {
          let handleMaterial = parseInt(item.customData.handleMaterial);
          switch (index) {
            case 0:
              return handleMaterial
                ? global.handleMaterials[handleMaterial].color
                : global.handleMaterials[0].color;
            case 1:
              return "#FFFFFF";
          }
        })
        .tier(main.material)
        .tag("c:tools/melee_weapon")
        .attackDamageBaseline(weapon.baseDamage)
        .speedBaseline(weapon.baseSpeed);
    });
  });

  global.rangeWeaponsTypes.forEach((weapon) => {
    let registryType = weapon.type == "crossbow" ? "crossbow" : "bow";
    let item = e
      .create(`${weapon.type}`, registryType)
      .unstackable()
      .translationKey("str")
      .color((item, index) => {
        let handleMaterial = parseInt(item.customData.handleMaterial);
        switch (index) {
          case 0:
            if (weapon.type == "crossbow")
              return handleMaterial
                ? global.handleMaterials[handleMaterial].color
                : global.handleMaterials[0].color;
            else
              return handleMaterial
                ? global.handleMaterials[handleMaterial].color
                : "#CCCCCC";
          case 1:
            return handleMaterial
              ? global.handleMaterials[handleMaterial].color
              : global.handleMaterials[0].color;
          case 2:
            return "#FFFFFF";
          case 3:
            return "#CCCCCC";
        }
      })
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
              player.addItem("minecraft:arrow");
            }
          });
        });
      });
    } else {
      item.bow((bow) => {
        bow.onUse((use) => {
          use.pull((e) => {
            const { player, bow } = e;

            if (player.getProjectile(bow).empty && player.xp > 10) {
              player.setXp(player.xp - 10);
              player.addItem("minecraft:arrow");
            }
          });
        });
      });
    }
  });

  global.flintlockWeaponsTypes.forEach((weapon) => {
    e.create(weapon.type, "crossbow")
      .translationKey("str")
      .unstackable()
      .crossbow((crossbow) => {
        crossbow.modifyCrossbow((attribute) =>
          attribute.arrowSpeed(10).arrowDamage(weapon.damage).pierce(1),
        );
      });
  });

  e.create("test_crossbow", "crossbow")
    .translationKey("str")
    .unstackable()
    .crossbow((crossbow) =>
      crossbow.onUse((use) => {
        use
          .pull((e) => global.pullCrossbow(e))
          .pullTick((e) => global.pullTickCrossbow(e))
          .shoot((e) => global.shootCrossbow(e));
      }),
    );

  e.create("test_bow", "bow")
    .translationKey("str")
    .unstackable()
    .bow((bow) =>
      bow.onUse((use) => {
        use
          .pull((e) => global.pullBow(e))
          .pullTick((e) => global.pullTickBow(e))
          .release((e) => global.releaseBow(e));
      }),
    );
});

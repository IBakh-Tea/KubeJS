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
    global.baseMaterials.forEach((main) => {
      if (
        heightTierWeapons.includes(weapon.type) &&
        lowTierMaterial.includes(main.material)
      )
        return;
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
              return main.color;
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
                : global.stringMaterials.color;
          case 1:
            return handleMaterial
              ? global.handleMaterials[handleMaterial].color
              : global.handleMaterials[0].color;
          case 2:
            return "#FFFFFF";
          case 3:
            return global.stringMaterials.color;
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

  global.firearmWeaponsTypes.forEach((weapon) => {
    e.create(weapon.type)
      .color((item, index) => {
        let handleMaterial = parseInt(item.customData.handleMaterial),
          stage = parseInt(item.customData.stage);
        switch (index) {
          case 1:
            if (stage == 3) return "#FFFFFF";
            else return;
          case 2:
            if (stage == 3) return;
            else return "#FFFFFF";
          case 3:
            return handleMaterial
              ? global.handleMaterials[handleMaterial].color
              : global.handleMaterials[0].color;
          case 4:
            return;
        }
      })
      .unstackable()
      .translationKey("str")
      .barWidth((item) => {
        const stage = parseInt(item.customData.stage);
        return stage ? (stage / 3) * 13 : 0;
      })
      .barColor(() => Color.WHITE);
  });

  e.create("handgun")
    .barWidth((item) => {
      let internalStorage = item.customData.internalStorage,
        clipSize = 12;

      switch (item.customData.magazine) {
        case "kubejs:large_handgun_magazine":
          clipSize = 24;
          break;
        case "kubejs:standard_handgun_magazine":
          clipSize = 12;
          break;
      }

      return internalStorage ? (internalStorage.length / clipSize) * 13 : 0;
    })
    .barColor(() => Color.WHITE)
    .color((item, index) => {
      const data = item.customData;

      switch (index) {
        case 0:
          if (data.magazine == "minecraft:air") return "#FFFFFF";
          else return;
        case 1:
          if (data.magazine != "minecraft:air") return "#FFFFFF";
          else return;
        case 2:
          if (data.muzzle == "kubejs:handgun_muzzle_brake") return "#FFFFFF";
          else return;
        case 3:
          if (data.muzzle == "kubejs:handgun_silencer") return "#FFFFFF";
          else return;
      }
    })
    .unstackable();

  e.create("revolver")
    .barWidth((item) => {
      const cylinder = item.customData.cylinder;
      return cylinder
        ? (cylinder.filter((item) => item != "minecraft:air").length / 6) * 13
        : 0;
    })
    .barColor(() => Color.WHITE)
    .color((item, index) => {
      const data = item.customData;

      switch (index) {
        case 0:
          if (!Boolean(parseInt(data.open))) return "#FFFFFF";
          else return;
        case 1:
          if (Boolean(parseInt(data.open))) return "#FFFFFF";
          else return;
      }
    })
    .unstackable();

  e.create("assault_rifle")
    .barWidth((item) => {
      let internalStorage = item.customData.internalStorage,
        clipSize = 50;

      switch (item.customData.magazine) {
        case "kubejs:drum_assault_rifle_magazine":
          clipSize = 100;
          break;
        case "kubejs:standard_assault_rifle_magazine":
          clipSize = 50;
          break;
      }

      return internalStorage ? (internalStorage.length / clipSize) * 13 : 0;
    })
    .barColor(() => Color.WHITE)
    .color((item, index) => {
      const data = item.customData;

      switch (index) {
        case 0:
          return "#FFFFFF";
        case 1:
          if (data.magazine == "kubejs:standard_assault_rifle_magazine")
            return "#FFFFFF";
          else return;
        case 2:
          if (data.magazine == "kubejs:drum_assault_rifle_magazine")
            return "#FFFFFF";
          else return;
        case 3:
          if (data.underbarrel == "kubejs:assault_rifle_grip") return "#FFFFFF";
          else return;
        case 4:
          if (data.underbarrel == "kubejs:assault_rifle_handguard")
            return "#FFFFFF";
          else return;
        case 5:
          if (data.stock == "kubejs:assault_rifle_stock") return "#FFFFFF";
          else return;
        case 6:
          if (data.muzzle == "kubejs:assault_rifle_muzzle_brake")
            return "#FFFFFF";
          else return;
        case 7:
          if (data.muzzle == "kubejs:assault_rifle_silencer") return "#FFFFFF";
          else return;
      }
    })
    .unstackable();

  // [
  //   ["trapdoor_rifle", 1],
  //   ["break_action_coachgun", 2],
  //   ["pump_action_shotgun", 8],
  //   ["bolt_action_rifle", 4],
  // ].forEach((weapon) => {
  //   e.create(weapon[0])
  //     .barWidth((item) => {
  //       const internalStorage = item.customData.internalStorage;
  //       return internalStorage ? (internalStorage.length / weapon[1]) * 13 : 0;
  //     })
  //     .barColor(() => Color.WHITE)
  //     .unstackable();
  // });
});

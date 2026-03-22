StartupEvents.registry("item", (e) => {
  global.meleeWeaponTypes.forEach((weapon) => {
    global.handleMaterials.forEach((handle) => {
      e.create(`${handle.material}_${weapon.type}`, "sword")
        .translationKey("str")
        .tag("c:tools/melee_weapon")
        .attackDamageBaseline(weapon.baseDamage)
        .speedBaseline(weapon.baseSpeed)
        .parentModel(`kubejs:item/base/${weapon.type}`)
        .texture("layer0", `kubejs:item/${weapon.type}/hilt`)
        .texture("layer1", `kubejs:item/${weapon.type}/blade`)
        .color(0, handle.color)
        .tooltip(`Handle: ${global.capitalizeFirstLetter(handle.material)}`)
        .tooltip(
          `Damage: ${"⬛".repeat(weapon.baseDamage)}${"⬜".repeat(10 - weapon.baseDamage)}`,
        )
        .tag("c:tools/melee_weapon")
        .attackDamageBaseline(weapon.baseDamage)
        .speedBaseline(weapon.baseSpeed)
        .tier("iron");
    });
  });

  e.create("double_jump_boots", "boots")
    .displayName("Ботинки Ветра")
    .material("netherite")
    .tooltip("§bПозволяют прыгнуть второй раз в воздухе!");

  ["pistol_round", "rifle_round", "shotgun_shell"].forEach((bullet) => {
    e.create(bullet).texture("layer0", `kubejs:item/ammo/${bullet}`);
  });

  e.create("revolver")
    .barWidth((item) => {
      const cylinder = item.customData.cylinder;
      return cylinder
        ? (cylinder.filter((item) => item != "minecraft:air").length / 6) * 13
        : 0;
    })
    .barColor((item) => Color.AQUA)
    .unstackable()
    .tag("minecraft:prevent_arm_swing")
    .useDuration((item) => 0)
    .useAnimation("none");

  e.create("winchester")
    .barWidth((item) => {
      const tube_magazine = item.customData.tube_magazine;
      return tube_magazine ? (tube_magazine.length / 12) * 13 : 0;
    })
    .barColor((item) => Color.AQUA)
    .unstackable();

  e.create("double_barrel_shotgun")
    .barWidth((item) => {
      const chamber = item.customData.chamber;
      return chamber ? (chamber.length / 2) * 13 : 0;
    })
    .barColor((item) => Color.AQUA)
    .unstackable();
});

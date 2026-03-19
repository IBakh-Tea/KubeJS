StartupEvents.registry("item", (e) => {
  global.meleeWeaponTypes.forEach((weapon) => {
    global.handleMaterials.forEach((handle) => {
      e.create(`${handle.material}_${weapon.type}`, "sword")
        .translationKey("str")
        .tag("c:tools/melee_weapon")
        .attackDamageBaseline(weapon.baseDamage)
        .speedBaseline(weapon.baseSpeed);
    });
  });
});

EntityEvents.afterHurt((event) => {
  const actual = event.source.actual;

  if (actual && actual.player) {
    const attacker = event.source.player,
      itemId = actual.mainHandItem.id,
      target = event.entity;

    if (itemId.endsWith("_sword")) {
    } else if (itemId.endsWith("_claymore")) {
    } else if (itemId.endsWith("_broadsword")) {
    } else if (itemId.endsWith("_axe")) {
    } else if (itemId.endsWith("_double_axe")) {
    } else if (itemId.endsWith("_mace")) {
      target.potionEffects.add("minecraft:slowness", 60, 1);
      target.potionEffects.add("minecraft:weakness", 60, 0);
    } else if (itemId.endsWith("_hammer")) {
    } else if (itemId.endsWith("_spear")) {
      if (attacker.isSprinting()) {
        target.knockback(2, actual.lookAngle.x * -2, actual.lookAngle.z * -2);
      } else if (attacker.isPassenger()) {
      }
    } else if (itemId.endsWith("_glaive")) {
    } else if (itemId.endsWith("_halberd")) {
    } else if (itemId.endsWith("_dagger")) {
      target.potionEffects.add("apothic_attributes:bleeding", 100, 0);
    } else if (itemId.endsWith("_sickle")) {
    } else if (itemId.endsWith("_scythe")) {
    } else if (itemId.endsWith("_rapier")) {
    } else if (itemId.endsWith("_fist")) {
    } else if (itemId.endsWith("_battlestaff")) {
    }
  }
});

PlayerEvents.tick((e) => {
  const { player } = e;
  const mainHandItem = player.getMainHandItem();

  if (!mainHandItem.isEmpty() && mainHandItem.id.endsWith("_bow")) {
    mainHandItem.set(
      "bettercombat:preset_id",
      "bettercombat:bow_two_handed_heavy",
    );
  } else if (
    (!mainHandItem.isEmpty() && mainHandItem.id.endsWith("_crossbow")) ||
    mainHandItem.id.endsWith("_musket")
  ) {
    mainHandItem.set(
      "bettercombat:preset_id",
      "bettercombat:crossbow_two_handed_heavy",
    );
  } else if (!mainHandItem.isEmpty() && mainHandItem.id.endsWith("_staff")) {
    mainHandItem.set("bettercombat:preset_id", "bettercombat:staff");
  } else if (!mainHandItem.isEmpty() && mainHandItem.id.endsWith("_wand")) {
    mainHandItem.set("bettercombat:preset_id", "bettercombat:wand");
  }
});

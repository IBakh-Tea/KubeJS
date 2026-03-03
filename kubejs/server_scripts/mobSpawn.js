const genSlot = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

EntityEvents.spawned((e) => {
  const { entity } = e;

  switch (entity.type) {
    case "minecraft:skeleton":
      let handle_material = genSlot(global.handleMaterials).material;

      if (Math.random() < 0.04) {
        entity.setItemSlot("mainhand", "");
        entity.setItemSlot("offhand", `kubejs:${handle_material}_bow`);
      } else entity.setItemSlot("mainhand", `kubejs:${handle_material}_bow`);

      break;
    case "minecraft:zombie":
      entity.setCustomName("Zombie Warrior");
      entity.setItemSlot("mainhand", "minecraft:bow");
      break;
    case "minecraft:pillager":
      entity.setItemSlot(
        "mainhand",
        `kubejs:${genSlot(global.handleMaterials).material}_iron_crossbow`,
      );
    case "minecraft:vindicator":
      entity.setItemSlot(
        "mainhand",
        `kubejs:${genSlot(global.handleMaterials).material}_iron_axe`,
      );
    default:
      break;
  }
});

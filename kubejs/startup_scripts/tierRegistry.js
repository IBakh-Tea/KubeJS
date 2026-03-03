ItemEvents.toolTierRegistry((e) => {
  global.newTier.forEach((material) => {
    e.add(material.name, (tier) => {
      tier.uses = material.uses;
      tier.speed = material.speed;
      tier.attackDamageBonus = material.attackDamage;
      tier.enchantmentValue = material.enchantment;
      tier.repairIngredient = material.repairMaterial;
    });
  });
});

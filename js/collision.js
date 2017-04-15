var simpleCollision = function(entity1, entity2) {
	ent1 = entity1.getPos();
	ent2 = entity2.getPos();

	if (ent1.left < ent2.right &&
		ent1.right > ent2.left &&
		ent1.top < ent2.bottom &&
		ent1.bottom > ent2.top) {
		return true;
	}
	return false;
}

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const LOCAL_CART_KEY = "cart";

function normalizeItem(item) {
  return {
    ...item,
    id: item.id || item.productId || item.uid || item._id,
    qty: item.qty || item.quantity || 1,
  };
}

function mergeCarts(remoteCart, localCart) {
  const merged = [...remoteCart.map(normalizeItem)];
  const existingIds = new Set(merged.map((item) => item.id));

  localCart.map(normalizeItem).forEach((localItem) => {
    if (!localItem.id) {
      merged.push(localItem);
      return;
    }

    const existing = merged.find((item) => item.id === localItem.id);
    if (existing) {
      existing.qty = Math.max(existing.qty, localItem.qty);
    } else {
      merged.push(localItem);
    }
  });

  return merged;
}

export async function loadCart(db, user) {
  const localCart = JSON.parse(localStorage.getItem(LOCAL_CART_KEY)) || [];

  if (!user) {
    return localCart.map(normalizeItem);
  }

  const ref = doc(db, "carts", user.uid);
  const snapshot = await getDoc(ref);
  const remoteCart = snapshot.exists() ? snapshot.data().items || [] : [];
  const mergedCart = mergeCarts(remoteCart, localCart);

  if (JSON.stringify(mergedCart) !== JSON.stringify(remoteCart)) {
    await setDoc(ref, { items: mergedCart, updatedAt: serverTimestamp() }, { merge: true });
  }

  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(mergedCart));
  return mergedCart;
}

export async function saveCart(db, cart, user) {
  const normalizedCart = cart.map(normalizeItem);
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(normalizedCart));

  if (!user) {
    return normalizedCart;
  }

  await setDoc(
    doc(db, "carts", user.uid),
    { items: normalizedCart, updatedAt: serverTimestamp() },
    { merge: true }
  );

  return normalizedCart;
}

export async function addCartItem(db, user, product) {
  const current = await loadCart(db, user);
  const item = normalizeItem(product);
  const existing = current.find((cartItem) => cartItem.id === item.id);

  if (existing) {
    existing.qty += 1;
  } else {
    current.push({ ...item, qty: 1 });
  }

  return saveCart(db, current, user);
}

export async function removeCartItem(db, user, index) {
  const current = await loadCart(db, user);
  const updated = [...current];
  updated.splice(index, 1);
  return saveCart(db, updated, user);
}

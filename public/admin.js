const API = "/api/admin";

function getToken() {
  return sessionStorage.getItem("adminToken");
}

async function request(url, options = {}) {
  const token = getToken();

  if (!token) {
    throw new Error("Admin token missing. Please log in.");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Request failed");
  }

  return data;
}

async function loadStats() {
  const data = await request(`${API}/stats`);

  const stats = document.getElementById("stats");
  stats.replaceChildren();

  for (const [key, value] of Object.entries(data)) {
    const p = document.createElement("p");
    p.textContent = `${key}: ${value}`;
    stats.appendChild(p);
  }
}

async function loadClaims() {
  const data = await request(`${API}/claims`);
  const container = document.getElementById("claims");
  container.replaceChildren();

  if (!data.claims.length) {
    container.textContent = "No claims available.";
    return;
  }

  for (const claim of data.claims) {
    const card = document.createElement("div");
    card.style.cssText =
      "border:1px solid #ccc;padding:15px;margin:12px 0;border-radius:8px";

    const title = document.createElement("h3");
    title.textContent = claim.item?.name || "Unknown Item";

    const status = document.createElement("p");
    status.textContent = `Status: ${claim.status}`;

    card.append(title, status);

    if (claim.status === "pending") {
      for (const action of ["approved", "rejected"]) {
        const button = document.createElement("button");
        button.textContent =
          action === "approved" ? "Approve" : "Reject";

        button.style.marginRight = "10px";

        button.addEventListener("click", async () => {
          try {
            await request(`${API}/claims/${claim._id}`, {
              method: "PATCH",
              body: JSON.stringify({ status: action })
            });

            await Promise.all([loadStats(), loadClaims()]);
            document.getElementById("message").textContent =
              `Claim ${action} successfully`;
          } catch (error) {
            document.getElementById("message").textContent =
              error.message;
          }
        });

        card.appendChild(button);
      }
    }

    container.appendChild(card);
  }
}

async function init() {
  try {
    await Promise.all([loadStats(), loadClaims()]);
  } catch (error) {
    document.getElementById("message").textContent =
      error.message;
  }
}

init();
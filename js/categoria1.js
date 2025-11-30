// PÁGINA DE CATEGORÍA - SMARTPHONES
// Archivo: categoria1.js

function showNotification(message, type) {
  type = type || "success";
  const bgColors = {
    success: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    info: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    warning: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    error: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  };

  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText =
    "position:fixed;top:100px;right:20px;padding:1rem 1.5rem;background:" +
    (bgColors[type] || bgColors.success) +
    ";color:white;border-radius:8px;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);z-index:10001;font-weight:500;animation:slideInRight 0.3s ease-out";

  document.body.appendChild(notification);

  setTimeout(function () {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(function () {
      notification.remove();
    }, 300);
  }, 3000);
}

function checkUserSession() {
  const userName = localStorage.getItem("userName");
  const userLink = document.querySelector('.icon-link[href="#login"]');

  if (userName && userLink) {
    userLink.innerHTML = '<i class="fas fa-user-circle"></i> ' + userName;
    userLink.href = "#perfil";

    const newLink = userLink.cloneNode(true);
    userLink.parentNode.replaceChild(newLink, userLink);

    newLink.addEventListener("click", function (e) {
      e.preventDefault();
      if (confirm("¿Deseas cerrar sesión?")) {
        localStorage.removeItem("userName");
        showNotification("Sesión cerrada", "info");
        setTimeout(function () {
          location.reload();
        }, 1000);
      }
    });
  }
}

function initLoginModal() {
  const loginModal = document.getElementById("login-modal");
  const loginLinks = document.querySelectorAll('a[href="#login"]');
  const modalClose = document.querySelector(".modal-close");
  const loginForm = document.getElementById("login-form");
  const togglePassword = document.querySelector(".toggle-password");

  if (!loginModal || !loginForm) return;

  loginLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.classList.add("active");
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", function () {
      loginModal.classList.remove("active");
    });
  }

  loginModal.addEventListener("click", function (e) {
    if (e.target === loginModal) {
      loginModal.classList.remove("active");
    }
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email")
      ? document.getElementById("email").value
      : "";
    const password = document.getElementById("password")
      ? document.getElementById("password").value
      : "";

    if (email && password) {
      const userName = email.split("@")[0];
      localStorage.setItem("userName", userName);
      loginModal.classList.remove("active");
      checkUserSession();
      showNotification("¡Bienvenido, " + userName + "!", "success");
    } else {
      showNotification("Completa todos los campos", "error");
    }
  });

  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("password");
      if (passwordInput) {
        const type =
          passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordInput.setAttribute("type", type);
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
      }
    });
  }
}

class CategoryFilters {
  constructor() {
    this.filters = {
      brand: "",
      processor: "",
      ram: "",
      storage: "",
      screen: "",
      priceMin: "",
      priceMax: "",
    };
    this.sortBy = "relevance";
    this.init();
  }

  init() {
    const self = this;
    const filterBrand = document.getElementById("filter-brand");
    const filterProcessor = document.getElementById("filter-processor");
    const filterRam = document.getElementById("filter-ram");
    const filterStorage = document.getElementById("filter-storage");
    const filterScreen = document.getElementById("filter-screen");
    const priceMin = document.getElementById("price-min");
    const priceMax = document.getElementById("price-max");
    const sortBy = document.getElementById("sort-by");

    if (filterBrand)
      filterBrand.addEventListener("change", function (e) {
        self.filters.brand = e.target.value;
      });
    if (filterProcessor)
      filterProcessor.addEventListener("change", function (e) {
        self.filters.processor = e.target.value;
      });
    if (filterRam)
      filterRam.addEventListener("change", function (e) {
        self.filters.ram = e.target.value;
      });
    if (filterStorage)
      filterStorage.addEventListener("change", function (e) {
        self.filters.storage = e.target.value;
      });
    if (filterScreen)
      filterScreen.addEventListener("change", function (e) {
        self.filters.screen = e.target.value;
      });
    if (priceMin)
      priceMin.addEventListener("input", function (e) {
        self.filters.priceMin = e.target.value;
      });
    if (priceMax)
      priceMax.addEventListener("input", function (e) {
        self.filters.priceMax = e.target.value;
      });

    if (sortBy) {
      sortBy.addEventListener("change", function (e) {
        self.sortBy = e.target.value;
        self.applySort();
      });
    }

    const applyBtn = document.querySelector(".apply-filters");
    const clearBtn = document.querySelector(".clear-filters");

    if (applyBtn)
      applyBtn.addEventListener("click", function () {
        self.applyFilters();
      });
    if (clearBtn)
      clearBtn.addEventListener("click", function () {
        self.clearFilters();
      });
  }

  applyFilters() {
    const cards = document.querySelectorAll(".product-card");
    let visibleCount = 0;
    const total = cards.length;

    const priceMinVal = this.filters.priceMin
      ? parseFloat(this.filters.priceMin)
      : 0;
    const priceMaxVal = this.filters.priceMax
      ? parseFloat(this.filters.priceMax)
      : Infinity;

    cards.forEach(
      function (card) {
        const brand = card.dataset.brand || "";
        const processor = card.dataset.processor || "";
        const ram = card.dataset.ram || "";
        const storage = card.dataset.storage || "";
        const screen = card.dataset.screen || "";
        const price = parseFloat(card.dataset.price) || 0;

        let visible = true;

        if (this.filters.brand && brand !== this.filters.brand) visible = false;
        if (this.filters.processor && processor !== this.filters.processor)
          visible = false;
        if (this.filters.ram && ram !== this.filters.ram) visible = false;
        if (this.filters.storage && storage !== this.filters.storage)
          visible = false;
        if (this.filters.screen && screen !== this.filters.screen)
          visible = false;
        if (price < priceMinVal || price > priceMaxVal) visible = false;

        if (visible) {
          card.removeAttribute("data-filtered");
          visibleCount++;
        } else {
          card.setAttribute("data-filtered", "hidden");
        }
      }.bind(this)
    );

    showNotification(visibleCount + " producto(s) encontrado(s)", "info");
    console.log(
      "Filtros aplicados:",
      this.filters,
      "Resultados:",
      visibleCount
    );

    if (window.categoryProducts && window.categoryProducts.updatePagination) {
      window.categoryProducts.currentPage = 1;
      window.categoryProducts.updatePagination();
    }
  }

  clearFilters() {
    this.filters = {
      brand: "",
      processor: "",
      ram: "",
      storage: "",
      screen: "",
      priceMin: "",
      priceMax: "",
    };

    const filterBrand = document.getElementById("filter-brand");
    const filterProcessor = document.getElementById("filter-processor");
    const filterRam = document.getElementById("filter-ram");
    const filterStorage = document.getElementById("filter-storage");
    const filterScreen = document.getElementById("filter-screen");
    const priceMin = document.getElementById("price-min");
    const priceMax = document.getElementById("price-max");

    if (filterBrand) filterBrand.value = "";
    if (filterProcessor) filterProcessor.value = "";
    if (filterRam) filterRam.value = "";
    if (filterStorage) filterStorage.value = "";
    if (filterScreen) filterScreen.value = "";
    if (priceMin) priceMin.value = "";
    if (priceMax) priceMax.value = "";

    const cards = document.querySelectorAll(".product-card");
    cards.forEach(function (card) {
      card.removeAttribute("data-filtered");
    });

    showNotification("Filtros limpiados", "success");
    console.log("Filtros limpiados");

    if (window.categoryProducts && window.categoryProducts.updatePagination) {
      window.categoryProducts.currentPage = 1;
      window.categoryProducts.updatePagination();
    }
  }

  applySort() {
    const grid = document.querySelector(".category-products-grid");
    if (!grid) return;

    const cards = Array.from(document.querySelectorAll(".product-card"));
    const visibleCards = cards.filter(function (card) {
      return card.style.display !== "none";
    });

    const self = this;
    visibleCards.sort(function (a, b) {
      const priceA = parseFloat(a.dataset.price) || 0;
      const priceB = parseFloat(b.dataset.price) || 0;

      switch (self.sortBy) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        default:
          return 0;
      }
    });

    visibleCards.forEach(function (card) {
      grid.appendChild(card);
    });

    const sortLabels = {
      relevance: "Más Relevante",
      "price-low": "Precio: Menor a Mayor",
      "price-high": "Precio: Mayor a Menor",
      rating: "Mejor Valorados",
      newest: "Más Recientes",
    };

    showNotification("Ordenado: " + sortLabels[this.sortBy], "info");
    console.log("Ordenado por:", this.sortBy);
  }
}

class CategoryProducts {
  constructor() {
    this.favorites = new Set(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );
    this.init();
  }

  init() {
    const self = this;
    this.restoreFavorites();

    // Botones de "Ver Detalles" (páginas de categoría)
    const detailBtns = document.querySelectorAll(".view-details-btn");
    detailBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const card = e.target.closest(".product-card");
        const productName = card
          ? card.querySelector(".product-name").textContent
          : "";
        self.showProductDetails(productName);
      });
    });

    const actionBtns = document.querySelectorAll(".action-btn");
    actionBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const icon = btn.querySelector("i");
        const card = btn.closest(".product-card");
        const productName = card
          ? card.querySelector(".product-name").textContent
          : "Producto";

        if (icon && icon.classList.contains("fa-eye")) {
          self.showQuickView(productName);
        } else if (icon && icon.classList.contains("fa-heart")) {
          self.toggleFavorite(icon, productName);
        }
      });
    });

    this.initPagination();
  }

  restoreFavorites() {
    const self = this;
    document.querySelectorAll(".product-card").forEach(function (card) {
      const productName = card.querySelector(".product-name")
        ? card.querySelector(".product-name").textContent
        : "";
      if (self.favorites.has(productName)) {
        const heartIcon = card.querySelector(".fa-heart");
        if (heartIcon) {
          heartIcon.classList.remove("far");
          heartIcon.classList.add("fas");
        }
      }
    });
  }

  toggleFavorite(icon, productName) {
    if (icon.classList.contains("fas")) {
      icon.classList.remove("fas");
      icon.classList.add("far");
      this.favorites.delete(productName);
      showNotification(productName + " eliminado de favoritos", "warning");
    } else {
      icon.classList.remove("far");
      icon.classList.add("fas");
      this.favorites.add(productName);
      showNotification(productName + " agregado a favoritos ❤️", "success");
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(Array.from(this.favorites))
    );
    console.log("Favoritos:", Array.from(this.favorites));
  }

  showProductDetails(productName) {
    showNotification("Detalles: " + productName, "info");
    console.log("Ver detalles:", productName);
  }

  showQuickView(productName) {
    showNotification("Vista rápida: " + productName, "info");
    console.log("Vista rápida:", productName);
  }

  initPagination() {
    const self = this;
    self.itemsPerPage = 6;
    self.currentPage = 1;

    self.updatePagination = function () {
      const allCards = Array.from(document.querySelectorAll(".product-card"));

      allCards.forEach(function (card) {
        const computedDisplay = card.getAttribute("data-filtered");
        if (computedDisplay === "hidden") {
          card.style.display = "none";
        } else {
          card.removeAttribute("data-filtered");
        }
      });

      const visibleCards = allCards.filter(function (card) {
        return (
          !card.hasAttribute("data-filtered") ||
          card.getAttribute("data-filtered") !== "hidden"
        );
      });

      const totalPages = Math.max(
        1,
        Math.ceil(visibleCards.length / self.itemsPerPage)
      );

      if (self.currentPage > totalPages) {
        self.currentPage = totalPages;
      }

      visibleCards.forEach(function (card, index) {
        const page = Math.floor(index / self.itemsPerPage) + 1;
        if (page === self.currentPage) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      self.updatePaginationButtons(totalPages, visibleCards.length);

      const countElement = document.querySelector(".products-count");
      if (countElement && visibleCards.length > 0) {
        const start = (self.currentPage - 1) * self.itemsPerPage + 1;
        const end = Math.min(
          self.currentPage * self.itemsPerPage,
          visibleCards.length
        );
        const total = visibleCards.length;
        countElement.innerHTML =
          "Mostrando <strong>" +
          start +
          "-" +
          end +
          "</strong> de <strong>" +
          total +
          "</strong> resultados";
      }
    };

    self.updatePaginationButtons = function (totalPages, totalItems) {
      const paginationContainer = document.querySelector(".pagination");
      if (!paginationContainer) return;

      if (totalItems === 0) {
        paginationContainer.innerHTML = "";
        return;
      }

      let html = "";

      html +=
        '<button class="pagination-btn pagination-prev" ' +
        (self.currentPage === 1 ? "disabled" : "") +
        ">Anterior</button>";

      for (let i = 1; i <= totalPages; i++) {
        html +=
          '<button class="pagination-btn pagination-number ' +
          (i === self.currentPage ? "active" : "") +
          '" data-page="' +
          i +
          '">' +
          i +
          "</button>";
      }

      html +=
        '<button class="pagination-btn pagination-next" ' +
        (self.currentPage === totalPages ? "disabled" : "") +
        ">Siguiente</button>";

      paginationContainer.innerHTML = html;

      self.attachPaginationEvents(totalPages);
    };

    self.attachPaginationEvents = function (totalPages) {
      const prevBtn = document.querySelector(".pagination-prev");
      const nextBtn = document.querySelector(".pagination-next");
      const numberBtns = document.querySelectorAll(".pagination-number");

      if (prevBtn) {
        prevBtn.addEventListener("click", function (e) {
          e.preventDefault();
          if (self.currentPage > 1) {
            self.currentPage--;
            self.updatePagination();

            const productsArea = document.querySelector(".products-area");
            if (productsArea) {
              productsArea.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", function (e) {
          e.preventDefault();
          if (self.currentPage < totalPages) {
            self.currentPage++;
            self.updatePagination();

            const productsArea = document.querySelector(".products-area");
            if (productsArea) {
              productsArea.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }
        });
      }

      numberBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const pageNum = parseInt(this.getAttribute("data-page"));
          if (!isNaN(pageNum) && pageNum !== self.currentPage) {
            self.currentPage = pageNum;
            self.updatePagination();

            const productsArea = document.querySelector(".products-area");
            if (productsArea) {
              productsArea.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }
        });
      });
    };

    const allCards = document.querySelectorAll(".product-card");
    allCards.forEach(function (card) {
      card.style.display = "block";
    });

    const totalPages = Math.ceil(allCards.length / self.itemsPerPage);
    self.updatePaginationButtons(totalPages, allCards.length);
    self.attachPaginationEvents(totalPages);
    self.updatePagination();
  }
}

function initMobileMenu() {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navContent = document.querySelector(".nav-content");

  if (mobileToggle && navContent) {
    mobileToggle.addEventListener("click", function () {
      navContent.classList.toggle("active");

      const icon = this.querySelector("i");
      if (icon) {
        if (navContent.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });

    document.addEventListener("click", function (e) {
      if (
        !e.target.closest(".navbar") &&
        navContent.classList.contains("active")
      ) {
        navContent.classList.remove("active");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  }
}

function initMobileFilters() {
  const filterToggle = document.getElementById("mobile-filters-toggle");
  const filtersSidebar = document.getElementById("filters-sidebar");
  const closeFilters = document.getElementById("close-filters");
  const filtersOverlay = document.getElementById("filters-overlay");

  if (!filterToggle || !filtersSidebar) return;

  filterToggle.addEventListener("click", function () {
    filtersSidebar.classList.add("active");
    filtersOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  if (closeFilters) {
    closeFilters.addEventListener("click", function () {
      filtersSidebar.classList.remove("active");
      filtersOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (filtersOverlay) {
    filtersOverlay.addEventListener("click", function () {
      filtersSidebar.classList.remove("active");
      filtersOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && filtersSidebar.classList.contains("active")) {
      filtersSidebar.classList.remove("active");
      filtersOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ========================================
// SISTEMA DE CARRITO DE COMPRAS
// ========================================

function initCartSystem() {
  const cartCountEl = document.getElementById("cart-count");
  let cartCount = parseInt(localStorage.getItem("cartCount") || "0", 10);

  function updateCartCount() {
    if (!cartCountEl) return;
    cartCountEl.textContent = cartCount;
    cartCountEl.style.display = cartCount > 0 ? "inline-flex" : "none";
  }

  // Actualizar el contador al cargar la página
  updateCartCount();

  // Botones de "Añadir al Carrito" (solo en página de promociones)
  document.querySelectorAll(".add-to-cart-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      // Incrementar contador
      cartCount++;
      localStorage.setItem("cartCount", cartCount);
      updateCartCount();

      // Feedback visual en el botón
      const originalText = btn.textContent;
      btn.textContent = "Se añadió al carrito ✔";
      btn.disabled = true;
      btn.classList.add("added-to-cart");

      // Restaurar botón después de 1.5 segundos
      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove("added-to-cart");
      }, 1500);

      // Notificación opcional
      showNotification("Producto añadido al carrito", "success");
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Página de Smartphones cargada");

  checkUserSession();
  initLoginModal();
  initMobileMenu();
  initMobileFilters();
  initCartSystem();

  window.categoryProducts = new CategoryProducts();
  window.categoryFilters = new CategoryFilters();

  console.log(
    "✅ Sistema listo: Login, Filtros, Ordenamiento, Favoritos, Menú Móvil, Panel Filtros, Paginación, Carrito"
  );
});

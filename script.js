// بيانات المنتجات
const products = [
    {
        id: 101,
        name: 'هاتف ذكي Pro',
        price: 1299,
        category: 'electronics',
        image: 'https://via.placeholder.com/250x250?text=هاتف+ذكي+Pro',
        rating: 4.5,
        reviews: 120,
        description: 'هاتف ذكي حديث بمميزات متقدمة'
    },
    {
        id: 102,
        name: 'سماعات رأس لاسلكية',
        price: 399,
        category: 'electronics',
        image: 'https://via.placeholder.com/250x250?text=سماعات+رأس',
        rating: 4.8,
        reviews: 250,
        description: 'سماعات رأس بجودة صوت عالية'
    },
    {
        id: 103,
        name: 'ساعة ذكية',
        price: 699,
        category: 'electronics',
        image: 'https://via.placeholder.com/250x250?text=ساعة+ذكية',
        rating: 4.3,
        reviews: 180,
        description: 'ساعة ذكية متوافقة مع جميع الأجهزة'
    },
    {
        id: 104,
        name: 'قميص كتان فاخر',
        price: 189,
        category: 'clothing',
        image: 'https://via.placeholder.com/250x250?text=قميص',
        rating: 4.6,
        reviews: 95,
        description: 'قميص مريح من أجود الخامات'
    },
    {
        id: 105,
        name: 'بنطلون جينز',
        price: 249,
        category: 'clothing',
        image: 'https://via.placeholder.com/250x250?text=بنطلون',
        rating: 4.4,
        reviews: 140,
        description: 'بنطلون جينز عالي الجودة'
    },
    {
        id: 106,
        name: 'حقيبة رياضية',
        price: 329,
        category: 'sports',
        image: 'https://via.placeholder.com/250x250?text=حقيبة+رياضية',
        rating: 4.7,
        reviews: 210,
        description: 'حقيبة رياضية مقاومة للماء'
    },
    {
        id: 107,
        name: 'دراجة رياضية',
        price: 1599,
        category: 'sports',
        image: 'https://via.placeholder.com/250x250?text=دراجة',
        rating: 4.5,
        reviews: 85,
        description: 'دراجة جبلية عالية الأداء'
    },
    {
        id: 108,
        name: 'دمبل ثقيل',
        price: 149,
        category: 'sports',
        image: 'https://via.placeholder.com/250x250?text=دمبل',
        rating: 4.6,
        reviews: 320,
        description: 'أثقال رياضية متنوعة الأوزان'
    },
    {
        id: 109,
        name: 'ألواح فرش وسائد',
        price: 399,
        category: 'home',
        image: 'https://via.placeholder.com/250x250?text=فرش',
        rating: 4.5,
        reviews: 175,
        description: 'فرش أرضي مريح وفاخر'
    },
    {
        id: 110,
        name: 'مصباح ذكي LED',
        price: 279,
        category: 'home',
        image: 'https://via.placeholder.com/250x250?text=مصباح',
        rating: 4.4,
        reviews: 220,
        description: 'مصباح ذكي قابل للتحكم عن بعد'
    },
    {
        id: 111,
        name: 'طاولة قهوة عصرية',
        price: 699,
        category: 'home',
        image: 'https://via.placeholder.com/250x250?text=طاولة',
        rating: 4.3,
        reviews: 110,
        description: 'طاولة قهوة بتصميم عصري'
    },
    {
        id: 112,
        name: 'مرآة جدار كبيرة',
        price: 459,
        category: 'home',
        image: 'https://via.placeholder.com/250x250?text=مرآة',
        rating: 4.6,
        reviews: 165,
        description: 'مرآة جدار بإطار فاخر'
    }
];

let cart = [];
let currentFilter = '';
let currentSort = '';

// عرض المنتجات
function displayProducts(productsToShow = products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${getCategoryName(product.category)}</p>
                <p class="product-price">${product.price} ر.س</p>
                <p class="product-rating">★ ${product.rating} (${product.reviews} تقييم)</p>
                <button class="add-btn" onclick="addToCart({
                    id: ${product.id},
                    name: '${product.name}',
                    price: ${product.price},
                    image: '${product.image}'
                })">إضافة للسلة</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// الحصول على اسم الفئة
function getCategoryName(category) {
    const categories = {
        'electronics': 'إلكترونيات',
        'clothing': 'ملابس',
        'home': 'منزل',
        'sports': 'رياضة'
    };
    return categories[category] || category;
}

// تصفية المنتجات حسب الفئة
function filterProducts(category) {
    currentFilter = category;
    currentSort = '';
    document.getElementById('sortSelect').value = '';
    
    const filtered = category ? products.filter(p => p.category === category) : products;
    displayProducts(filtered);
}

// إعادة تعيين التصفية
function resetFilters() {
    currentFilter = '';
    currentSort = '';
    document.getElementById('sortSelect').value = '';
    displayProducts(products);
}

// ترتيب المنتجات
function sortProducts() {
    const sortValue = document.getElementById('sortSelect').value;
    currentSort = sortValue;
    
    let sortedProducts = [...products];
    
    if (currentFilter) {
        sortedProducts = sortedProducts.filter(p => p.category === currentFilter);
    }

    switch(sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sortedProducts.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
    }

    displayProducts(sortedProducts);
}

// إضافة المنتج للسلة
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    
    // عرض رسالة التأكيد
    showNotification(`تم إضافة ${product.name} للسلة!`);
}

// تحديث السلة
function updateCart() {
    updateCartCount();
    updateCartDisplay();
    saveCart();
}

// تحديث عدد المنتجات في السلة
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// عرض المنتجات في السلة
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align: center; padding: 2rem; color: #999;">السلة فارغة</p>';
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} ر.س</div>
                <div class="cart-item-quantity">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    updateCartTotal();
}

// زيادة الكمية
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

// تقليل الكمية
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
        }
        updateCart();
    }
}

// إزالة المنتج من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('تم حذف المنتج من السلة');
}

// تحديث الإجمالي
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = total + ' ر.س';
}

// تبديل عرض السلة
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('active');
}

// الذهاب للدفع
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('السلة فارغة!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderSummary = cart.map(item => `${item.name} × ${item.quantity}`).join('\n');
    
    alert(`طلبك:\n${orderSummary}\n\nالإجمالي: ${total} ر.س\n\nشكراً لاختيارك TXstore!`);
    
    cart = [];
    updateCart();
    toggleCart();
}

// إرسال نموذج الاتصال
function submitForm(event) {
    event.preventDefault();
    showNotification('شكراً! تم استقبال رسالتك بنجاح', 'success');
    event.target.reset();
}

// عرض الإشعارات
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background-color: ${type === 'success' ? '#2ECC71' : '#E74C3C'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// حفظ السلة في التخزين المحلي
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// استعادة السلة من التخزين المحلي
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// إضافة أنماط الحركة
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// تحميل البيانات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    loadCart();

    // إغلاق السلة عند النقر خارجها
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('cartSidebar');
        const cartBtn = document.querySelector('.cart-btn');
        
        if (!sidebar.contains(e.target) && !cartBtn.contains(e.target) && sidebar.classList.contains('active')) {
            // لا تغلق إذا كان النقر على الزر
        }
    });

    // تنعيم الانتقال للأقسام
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// وظيفة البحث
function searchProducts() {
    const searchTerm = document.querySelector('.search-btn').parentElement.querySelector('input')?.value || '';
    if (searchTerm.trim()) {
        const results = products.filter(p => 
            p.name.includes(searchTerm) || p.description.includes(searchTerm)
        );
        displayProducts(results);
    }
}

// دالة مساعدة للحصول على حالة الطقس (اختيارية للمتجر)
function getWeatherGreeting() {
    const hours = new Date().getHours();
    if (hours < 12) {
        return 'صباح الخير!';
    } else if (hours < 18) {
        return 'مساء الخير!';
    } else {
        return 'مساء السعادة!';
    }
}

console.log('%cمرحباً في TXstore', 'color: #FF6B6B; font-size: 20px; font-weight: bold');
console.log('%cنسعد برؤيتك معنا!', 'color: #4A90E2; font-size: 14px');

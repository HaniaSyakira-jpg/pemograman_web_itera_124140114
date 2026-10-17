
import { sampleUsers, sampleProducts } from "./modules/data.js";
import { formatRupiah, capitalize } from "./modules/utils.js";

// Menjalankan seluruh demo
export function runDemos(addOutput) {
    demoVariables(addOutput);
    demoArrowFunctions(addOutput);
    demoTemplateLiterals(addOutput);
    demoDestructuring(addOutput);
    demoSpreadRest(addOutput);
    demoDefaultParams(addOutput);
    demoClasses(addOutput);
    demoObjectLiterals(addOutput);
    demoArrayMethods(addOutput);
    demoAdvancedArrays(addOutput);
    demoPromises(addOutput);
    demoAsyncAwait(addOutput);
}

// 1. LET DAN CONST
function demoVariables(addOutput) {
    let semester = 5;
    const nama = "Hania";
    const mahasiswa = { nama, jurusan: "Teknik Informatika" };

    // Properti objek const masih bisa diubah
    mahasiswa.jurusan = "Informatika";

    addOutput("1. Let & Const", {
        nama,
        semester,
        mahasiswa,
        keterangan: "let dapat diubah; const tidak dapat di-assign ulang."
    });
}

// 2. ARROW FUNCTIONS
function demoArrowFunctions(addOutput) {
    function regularSum(a, b) {
        return a + b;
    }

    const arrowSum = (a, b) => a + b;
    const square = number => number * number;
    const sayHello = name => `Halo, ${name}!`;

    addOutput("2. Arrow Functions", {
        regularFunction: regularSum(5, 3),
        arrowFunction: arrowSum(5, 3),
        square: square(4),
        greeting: sayHello("Hania")
    });
}

// 3. TEMPLATE LITERALS
function demoTemplateLiterals(addOutput) {
    const name = "Hania";
    const course = "JavaScript Next Gen";
    const score = 90;

    addOutput("3. Template Literals", {
        concatenation: "Halo, " + name,
        templateLiteral: `Halo, ${name}!`,
        multiline: `Nama: ${name}\nMateri: ${course}`,
        expression: `Nilai akhir: ${score + 5}`
    });
}

// 4. DESTRUCTURING
function demoDestructuring(addOutput) {
    const student = {
        name: "Hania",
        age: 20,
        address: {
            province: "Lampung",
            city: "Bandar Lampung",
            detail: { district: "Rajabasa" }
        }
    };

    const {
        name,
        age,
        role = "Mahasiswa",
        address: {
            province,
            detail: { district }
        }
    } = student;

    const [first, , third, ...remaining] = [10, 20, 30, 40, 50];

    let a = 1;
    let b = 2;
    [a, b] = [b, a];

    const employee = {
        employeeName: "Alice",
        position: "Developer"
    };
    const { employeeName: displayName } = employee;

    const nestedThreeLevels = {
        company: {
            department: {
                manager: "Jane"
            }
        }
    };
    const {
        company: {
            department: {
                manager
            }
        }
    } = nestedThreeLevels;

    const grouped = [];
    for (const { name, role } of sampleUsers) {
        grouped.push({ name, role });
    }

    addOutput("4. Destructuring", {
        name,
        age,
        role,
        province,
        district,
        first,
        third,
        remaining,
        swapped: { a, b },
        renamedVariable: displayName,
        threeLevelNested: manager,
        destructuringInForOf: grouped
    });
}

// 5. SPREAD DAN REST
function demoSpreadRest(addOutput) {
    const numbers = [10, 20, 30, 40, 50];
    const copiedNumbers = [...numbers];
    const mergedNumbers = [...numbers, 60, 70];

    const user = { name: "Hania", role: "Mahasiswa" };
    const updatedUser = { ...user, role: "Developer" };

    const settings = { theme: "light", language: "id" };
    const preferences = { ...settings, theme: "dark" };

    function calculateStats(...values) {
        const total = values.reduce((sum, value) => sum + value, 0);
        return {
            values,
            min: Math.min(...values),
            max: Math.max(...values),
            average: total / values.length
        };
    }

    addOutput("5. Spread & Rest", {
        copiedNumbers,
        mergedNumbers,
        updatedUser,
        mergedObjects: { ...user, ...settings, ...preferences },
        statistics: calculateStats(10, 20, 30, 40, 50)
    });
}

// 6. DEFAULT PARAMETERS
function demoDefaultParams(addOutput) {
    function greet(name = "Pengguna", greeting = "Halo") {
        return `${greeting}, ${name}!`;
    }

    function calculatePrice(price, tax = 0.11) {
        return price + price * tax;
    }

    function createProfile({ name = "Anonim", role = "Pengguna" } = {}) {
        return { name, role };
    }

    addOutput("6. Default Parameters", {
        defaultGreeting: greet(),
        customGreeting: greet("Hania", "Selamat datang"),
        priceWithTax: formatRupiah(calculatePrice(100000)),
        profileDefaults: createProfile(),
        profileCustom: createProfile({ name: "Hania", role: "Mahasiswa" })
    });
}

// 7. CLASSES, INHERITANCE, GETTER DAN SETTER
function demoClasses(addOutput) {
    class Product {
        constructor(name, price) {
            this.name = name;
            this.price = price;
        }

        get formattedPrice() {
            return formatRupiah(this.price);
        }

        set productPrice(value) {
            if (value < 0) {
                throw new Error("Harga tidak boleh negatif.");
            }
            this.price = value;
        }

        getInfo() {
            return `${this.name}: ${this.formattedPrice}`;
        }
    }

    class DigitalProduct extends Product {
        constructor(name, price, fileSize) {
            super(name, price);
            this.fileSize = fileSize;
        }

        getInfo() {
            return `${super.getInfo()} (${this.fileSize} MB)`;
        }
    }

    class PhysicalProduct extends Product {
        constructor(name, price, weight) {
            super(name, price);
            this.weight = weight;
        }

        getInfo() {
            return `${super.getInfo()} (${this.weight} kg)`;
        }
    }

    const digital = new DigitalProduct("E-book JavaScript", 75000, 12);
    const physical = new PhysicalProduct("Keyboard", 850000, 0.8);
    physical.productPrice = 800000;

    addOutput("7. Classes & Inheritance", {
        digitalProduct: digital.getInfo(),
        physicalProduct: physical.getInfo(),
        getter: physical.formattedPrice,
        setterResult: physical.price,
        instanceCheck: digital instanceof Product
    });
}

// 8. ENHANCED OBJECT LITERALS
function demoObjectLiterals(addOutput) {
    const name = "Hania";
    const role = "Mahasiswa";
    const property = "status";

    const profile = {
        name,
        role,
        greet() {
            return `Halo, saya ${this.name}.`;
        },
        [property]: "Aktif"
    };

    addOutput("8. Enhanced Object Literals", {
        profile,
        greeting: profile.greet(),
        computedProperty: profile.status
    });
}

// 9. MODERN ARRAY METHODS
function demoArrayMethods(addOutput) {
    const numbers = [1, 2, 3, 4, 5, 6];

    const averageAge =
        sampleUsers.reduce((total, user) => total + user.age, 0)
        / sampleUsers.length;

    const activeUsers = sampleUsers.filter(user => user.active);

    // Mengelompokkan pengguna berdasarkan role menggunakan reduce
    const groupByRole = sampleUsers.reduce((groups, user) => {
        const key = user.role;
        if (!groups[key]) groups[key] = [];
        groups[key].push(user.name);
        return groups;
    }, {});

    const productAnalytics = sampleProducts
        .filter(product => product.price >= 1000000)
        .map(product => ({
            name: product.name,
            price: product.price
        }))
        .reduce((result, product) => {
            result.totalPrice += product.price;
            result.products.push(product);
            return result;
        }, { totalPrice: 0, products: [] });

    addOutput("9. Modern Array Methods", {
        map: numbers.map(number => number * 2),
        filter: numbers.filter(number => number > 3),
        find: numbers.find(number => number > 3),
        some: numbers.some(number => number > 5),
        every: numbers.every(number => number > 0),
        reduceSum: numbers.reduce((sum, number) => sum + number, 0),
        chaining: numbers.filter(number => number % 2 === 0)
            .map(number => number * 2),
        averageUserAge: averageAge,
        activeUsers: activeUsers.map(user => user.name),
        groupByRole,
        productAnalytics
    });
}

// 10. ADVANCED ARRAYS
function demoAdvancedArrays(addOutput) {
    const nested = [[1, 2], [3, 4], [5, [6, 7]]];

    addOutput("10. Advanced Arrays", {
        spreadClone: [...[1, 2, 3]],
        arrayFrom: Array.from("WEB"),
        arrayOf: Array.of(10, 20, 30),
        flatOneLevel: nested.flat(),
        flatAllLevels: nested.flat(Infinity),
        flatMap: [1, 2, 3].flatMap(number => [number, number * 2]),
        includes: [1, 2, 3].includes(2),
        productNames: sampleProducts.map(product => capitalize(product.name))
    });
}

// 11. PROMISES
function demoPromises(addOutput) {
    const basicPromise = new Promise(resolve => {
        setTimeout(() => resolve("Promise berhasil diselesaikan."), 300);
    });

    const chainedPromise = Promise.resolve(5)
        .then(number => number * 2)
        .then(number => `Hasil chaining: ${number}`);

    const promiseAll = Promise.all([
        Promise.resolve("Data pengguna"),
        Promise.resolve("Data produk"),
        Promise.resolve("Data pesanan")
    ]);

    // Race menggunakan waktu simulasi agar hasilnya konsisten
    const promiseRace = Promise.race([
        new Promise(resolve => setTimeout(() => resolve("Proses A selesai"), 100)),
        new Promise(resolve => setTimeout(() => resolve("Proses B selesai"), 200))
    ]);

    addOutput("11. Promises", {
        status: "Promise sedang diproses...",
        examples: "Basic Promise, chaining, Promise.all, dan Promise.race."
    });

    basicPromise
        .then(message => addOutput("Promise: Basic", { message }))
        .catch(error => addOutput("Promise Error", { message: error.message }));

    chainedPromise.then(message =>
        addOutput("Promise: Chaining", { message })
    );

    promiseAll.then(results =>
        addOutput("Promise: Promise.all", { results })
    );

    promiseRace.then(winner =>
        addOutput("Promise: Promise.race", { winner })
    );
}

// 12. ASYNC/AWAIT DAN LATIHAN ASINKRON
async function demoAsyncAwait(addOutput) {
    const mockUsers = [
        { id: 1, name: "Hania" },
        { id: 2, name: "Alice" },
        { id: 3, name: "Bob" },
        { id: 4, name: "Jane" },
        { id: 5, name: "John" }
    ];

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function fetchMockUsers() {
        await delay(150);
        return mockUsers;
    }

    // Retry dengan exponential backoff
    async function retry(operation, attempts = 3) {
        let lastError;

        for (let attempt = 0; attempt < attempts; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error;
                if (attempt < attempts - 1) {
                    await delay(100 * (2 ** attempt));
                }
            }
        }

        throw lastError;
    }

    // Simulasi pencarian debounced
    function debounce(callback, wait = 100) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => callback(...args), wait);
        };
    }

    try {
        // Simulasi fetch beberapa endpoint secara paralel
        const [users, products] = await Promise.all([
            fetchMockUsers(),
            Promise.resolve(sampleProducts)
        ]);

        // Pagination sederhana
        const page = 1;
        const pageSize = 2;
        const paginatedUsers = users.slice(
            (page - 1) * pageSize,
            page * pageSize
        );

        // Loading state
        const loadingState = { loading: true, message: "Memuat data..." };
        loadingState.loading = false;
        loadingState.message = "Data berhasil dimuat.";

        // Error handling dan retry
        let attempts = 0;
        const retryResult = await retry(async () => {
            attempts++;
            if (attempts < 2) throw new Error("Simulasi percobaan pertama gagal");
            return "Berhasil setelah retry.";
        });

        // Simulasi debounced search
        let searchResult = [];
        const search = debounce(query => {
            searchResult = users.filter(user =>
                user.name.toLowerCase().includes(query.toLowerCase())
            );
        }, 100);

        search("ha");
        await delay(150);

        addOutput("12. Async/Await", {
            users,
            products: products.map(product => product.name),
            parallelRequests: "Data pengguna dan produk diproses bersama.",
            loadingState,
            pagination: {
                page,
                pageSize,
                totalUsers: users.length,
                results: paginatedUsers
            },
            retry: { attempts, result: retryResult },
            debouncedSearch: searchResult
        });
    } catch (error) {
        addOutput("12. Async/Await: Error Handling", {
            message: error.message
        });
    }
}

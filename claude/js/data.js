// Application data and content
const AppData = {
    // Home page features
    homeFeatures: [
        {
            icon: '🚀',
            title: 'High Performance',
        },
        {
            icon: '🐳',
            title: 'Container Platform',
            description: 'Built-in Docker and Kubernetes support with orchestration tools for scalable application deployment.'
        },
        {
            icon: '📊',
            title: 'Performance Monitoring',
            description: 'Real-time application profiling, resource monitoring, and automated performance optimization suggestions.'
        },
        {
            icon: '🔍',
            title: 'Advanced Debugging',
            description: 'Step-through debugging, memory analysis, and distributed tracing for complex multi-service applications.'
        },
        {
            icon: '🚀',
            title: 'CI/CD Pipeline',
            description: 'Automated build, test, and deployment pipelines with integration to popular git repositories and cloud platforms.'
        },
        {
            icon: '🧪',
            title: 'Testing Framework',
            description: 'Comprehensive testing suite with unit, integration, and end-to-end testing capabilities plus automated test generation.'
        }
    ],

    // Software system features
    softwareSystem: [
        {
            label: 'Boot Time',
            value: 'Sub-10 second boot with SSD optimization<br>Instant resume from sleep mode'
        },
        {
            label: 'Resource Management',
            value: 'Intelligent memory allocation<br>Dynamic CPU scaling'
        },
        {
            label: 'File System',
            value: 'ZFS with compression and deduplication<br>Automatic snapshots and versioning'
        },
        {
            label: 'Virtualization',
            value: 'KVM hypervisor with GPU passthrough<br>Container runtime optimization'
        }
    ],

    // AI & ML capabilities
    capabilitiesAI: [
        {
            icon: '🧠',
            title: 'Neural Network Training',
            description: 'Train complex deep learning models with distributed computing across multiple GPUs. Support for TensorFlow, PyTorch, and custom frameworks.'
        },
        {
            icon: '👁️',
            title: 'Computer Vision',
            description: 'Real-time object detection, facial recognition, and image classification with sub-millisecond inference times.'
        },
        {
            icon: '💬',
            title: 'Natural Language Processing',
            description: 'Advanced text analysis, language translation, and conversational AI with support for 100+ languages.'
        },
        {
            icon: '📈',
            title: 'Predictive Analytics',
            description: 'Forecast trends, detect anomalies, and generate insights from large datasets using advanced statistical models.'
        }
    ],

    // Data processing capabilities
    capabilitiesData: [
        {
            icon: '⚡',
            title: 'Real-time Streaming',
            description: 'Process millions of events per second with Apache Kafka integration and custom stream processing engines.'
        },
        {
            icon: '💾',
            title: 'Big Data Analytics',
            description: 'Handle petabyte-scale datasets with distributed processing using Spark, Hadoop, and custom distributed algorithms.'
        },
        {
            icon: '🔄',
            title: 'ETL Pipelines',
            description: 'Automated Extract, Transform, Load processes with data validation, error handling, and monitoring for enterprise data workflows.'
        },
        {
            icon: '🔍',
            title: 'Data Mining',
            description: 'Discover hidden patterns and relationships in complex datasets using advanced clustering and association algorithms.'
        }
    ],

    // Development & deployment capabilities
    capabilitiesDev: [
        {
            icon: '🏗️',
            title: 'Microservices Architecture',
            description: 'Build and deploy scalable microservices with automatic service discovery, load balancing, and fault tolerance.'
        },
        {
            icon: '☁️',
            title: 'Cloud-Native Development',
            description: 'Develop applications optimized for cloud deployment with containerization, orchestration, and auto-scaling capabilities.'
        },
        {
            icon: '🔐',
            title: 'DevSecOps Integration',
            description: 'Security-first development with automated vulnerability scanning, compliance checking, and security policy enforcement.'
        },
        {
            icon: '📱',
            title: 'Cross-Platform Development',
            description: 'Build applications for web, mobile, and desktop from a single codebase using modern frameworks and tools.'
        }
    ],

    // Performance metrics
    capabilitiesMetrics: [
        {
            label: 'Processing Power',
            value: '1 trillion operations per second<br>Sub-microsecond response times'
        },
        {
            label: 'Concurrent Users',
            value: 'Support for 1M+ simultaneous connections<br>Linear scaling with load balancing'
        },
        {
            label: 'Data Throughput',
            value: '100GB/s data processing speed<br>Real-time analytics at scale'
        },
        {
            label: 'Uptime',
            value: '99.99% availability guarantee<br>Automatic failover and recovery'
        },
        {
            label: 'Security',
            value: 'Military-grade encryption<br>Zero-trust architecture'
        },
        {
            label: 'Scalability',
            value: 'Horizontal scaling to 1000+ nodes<br>Elastic resource allocation'
        }
    ],

    // Industry applications
    capabilitiesIndustry: [
        {
            icon: '🏥',
            title: 'Healthcare',
            description: 'Medical imaging analysis, drug discovery acceleration, patient data management, and diagnostic assistance with AI-powered insights.'
        },
        {
            icon: '🏦',
            title: 'Finance',
            description: 'High-frequency trading, fraud detection, risk assessment, and regulatory compliance with real-time transaction processing.'
        },
        {
            icon: '🏭',
            title: 'Manufacturing',
            description: 'Predictive maintenance, quality control, supply chain optimization, and industrial IoT integration for smart factories.'
        },
        {
            icon: '🚗',
            title: 'Automotive',
            description: 'Autonomous driving systems, vehicle diagnostics, fleet management, and connected car services with edge computing.'
        },
        {
            icon: '🎮',
            title: 'Gaming & Entertainment',
            description: 'Real-time rendering, physics simulation, multiplayer networking, and content delivery for immersive experiences.'
        },
        {
            icon: '🌐',
            title: 'Telecommunications',
            description: 'Network optimization, 5G infrastructure, edge computing deployment, and intelligent traffic routing systems.'
        }
    ],

    // Future roadmap
    capabilitiesRoadmap: [
        {
            icon: '🚀',
            title: 'Quantum Computing Integration',
            description: 'Hybrid classical-quantum algorithms for optimization problems and cryptographic applications coming in Q3 2025.'
        },
        {
            icon: '🧬',
            title: 'Biological Computing',
            description: 'DNA storage systems and bio-inspired computing architectures for ultra-low power processing applications.'
        },
        {
            icon: '🌌',
            title: 'Edge-to-Space Computing',
            description: 'Satellite-based computing nodes for global coverage and space-based data processing capabilities.'
        }
    ]
};

// Configuration and settings
const AppConfig = {
    // Animation settings
    animations: {
        enabled: true,
        duration: 600,
        easing: 'ease-out',
        staggerDelay: 100
    },
    
    // Navigation settings
    navigation: {
        enableKeyboardNav: true,
        enableSwipeNav: false,
        autoCloseMobileMenu: true
    },
    
    // Performance settings
    performance: {
        enableLazyLoading: true,
        enableImageOptimization: true,
        enableIntersectionObserver: true
    },
    
    // Accessibility settings
    accessibility: {
        enableFocusManagement: true,
        enableReducedMotion: true,
        enableHighContrast: false
    },
    
    // Debug settings
    debug: {
        enableLogging: false,
        enablePerformanceMonitoring: false
    }
};

// Utility functions for data manipulation
const DataUtils = {
    // Get data by section
    getSection: function(section) {
        return AppData[section] || [];
    },
    
    // Filter data by criteria
    filterData: function(data, criteria) {
        if (!criteria) return data;
        return data.filter(item => {
            for (let key in criteria) {
                if (item[key] !== criteria[key]) {
                    return false;
                }
            }
            return true;
        });
    },
    
    // Sort data by field
    sortData: function(data, field, order = 'asc') {
        return [...data].sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            
            if (order === 'desc') {
                return bVal.localeCompare ? bVal.localeCompare(aVal) : bVal - aVal;
            }
            return aVal.localeCompare ? aVal.localeCompare(bVal) : aVal - bVal;
        });
    },
    
    // Search data by text
    searchData: function(data, searchTerm, fields = ['title', 'description']) {
        if (!searchTerm) return data;
        
        const term = searchTerm.toLowerCase();
        return data.filter(item => {
            return fields.some(field => {
                const value = item[field];
                return value && value.toLowerCase().includes(term);
            });
        });
    },
    
    // Group data by field
    groupData: function(data, field) {
        return data.reduce((groups, item) => {
            const group = item[field];
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(item);
            return groups;
        }, {});
    },
    
    // Get random items from data
    getRandomItems: function(data, count) {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },
    
    // Validate data structure
    validateData: function(data, requiredFields = []) {
        if (!Array.isArray(data)) {
            console.warn('Data is not an array');
            return false;
        }
        
        return data.every(item => {
            return requiredFields.every(field => {
                if (!item.hasOwnProperty(field)) {
                    console.warn(`Missing required field: ${field}`);
                    return false;
                }
                return true;
            });
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AppData, AppConfig, DataUtils };
}   // Home page features
const AppData = {
    homeFeatures: [
        {
            icon: '🚀',
            title: 'High Performance',
            description: 'Experience lightning-fast processing with our optimized hardware and software stack designed for maximum efficiency.'
        },
        {
            icon: '🔧',
            title: 'Easy Setup',
            description: 'Get up and running in minutes with our streamlined installation process and comprehensive setup guides.'
        },
        {
            icon: '💡',
            title: 'Smart Features',
            description: 'Advanced AI-powered capabilities that adapt to your needs and learn from your usage patterns.'
        },
        {
            icon: '🛡️',
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security with 99.9% uptime guarantee and continuous monitoring.'
        },
        {
            icon: '🌐',
            title: 'Global Reach',
            description: 'Worldwide network infrastructure ensuring optimal performance regardless of your location.'
        },
        {
            icon: '📊',
            title: 'Analytics',
            description: 'Comprehensive insights and real-time analytics to help you make data-driven decisions.'
        }
    ],

    // Setup steps
    setupSteps: [
        {
            number: 1,
            title: 'System Requirements Check',
            description: 'Ensure your system meets the minimum requirements: 8GB RAM, 100GB storage, and a modern processor. Run our compatibility checker to verify your system is ready.'
        },
        {
            number: 2,
            title: 'Download & Install',
            description: 'Download the latest TechFlow installer from our secure servers. The installation process is automated and takes approximately 10-15 minutes to complete.'
        },
        {
            number: 3,
            title: 'Initial Configuration',
            description: 'Configure your preferences, set up user accounts, and customize the interface to match your workflow. Our setup wizard will guide you through each option.'
        },
        {
            number: 4,
            title: 'Connect & Sync',
            description: 'Connect to your cloud services, sync your data, and integrate with existing tools. All connections are encrypted and secure by default.'
        },
        {
            number: 5,
            title: 'Verification & Testing',
            description: 'Run system diagnostics, test all features, and verify everything is working correctly. Our built-in testing suite ensures optimal performance.'
        }
    ],

    // Setup tips
    setupTips: [
        {
            icon: '⚡',
            title: 'Speed Up Installation',
            description: 'Close unnecessary applications and ensure stable internet connection for faster setup.'
        },
        {
            icon: '🔐',
            title: 'Security First',
            description: 'Enable two-factor authentication and create strong passwords during initial setup.'
        },
        {
            icon: '📋',
            title: 'Backup Configuration',
            description: 'Save your configuration settings to quickly restore your setup if needed.'
        }
    ],

    // Hardware specifications
    hardwareSpecs: [
        {
            label: 'Processor',
            value: 'Intel Core i9-13900K / AMD Ryzen 9 7950X<br>24 cores, 32 threads, up to 5.8GHz'
        },
        {
            label: 'Memory',
            value: '128GB DDR5-5600 ECC RAM<br>Error correction, dual-channel'
        },
        {
            label: 'Storage',
            value: '2TB NVMe SSD + 8TB HDD<br>7,000 MB/s read speed'
        },
        {
            label: 'Graphics',
            value: 'NVIDIA RTX 4090 / AMD RX 7900 XTX<br>24GB VRAM, Ray tracing enabled'
        },
        {
            label: 'Network',
            value: '10Gb Ethernet + Wi-Fi 7<br>Ultra-low latency connectivity'
        },
        {
            label: 'Power',
            value: '1200W 80+ Titanium PSU<br>Modular cables, silent operation'
        }
    ],

    // Hardware features
    hardwareFeatures: [
        {
            icon: '🔥',
            title: 'Thermal Management',
            description: 'Advanced liquid cooling system with custom loop design maintains optimal temperatures under heavy loads.'
        },
        {
            icon: '🔊',
            title: 'Acoustic Optimization',
            description: 'Whisper-quiet operation with intelligent fan curves and sound-dampening materials.'
        },
        {
            icon: '⚡',
            title: 'Power Efficiency',
            description: 'Dynamic power scaling reduces energy consumption by up to 40% during idle periods.'
        },
        {
            icon: '🔧',
            title: 'Modular Design',
            description: 'Tool-free upgrades and hot-swappable components for easy maintenance and expansion.'
        },
        {
            icon: '📡',
            title: 'Connectivity Hub',
            description: 'Multiple USB-C, Thunderbolt 4, and legacy ports for all your peripheral needs.'
        },
        {
            icon: '🛡️',
            title: 'Hardware Security',
            description: 'TPM 2.0 chip and hardware-level encryption protect your data at the silicon level.'
        }
    ],

    // Hardware benchmarks
    hardwareBenchmarks: [
        {
            label: 'CPU Performance',
            value: 'Cinebench R23: 38,000+ points<br>Geekbench 5: 25,000+ multi-core'
        },
        {
            label: 'GPU Performance',
            value: '4K Gaming: 120+ FPS<br>8K Rendering: Real-time capable'
        },
        {
            label: 'Storage Speed',
            value: 'Sequential Read: 7,000 MB/s<br>Random IOPS: 1M+ operations/sec'
        },
        {
            label: 'Memory Bandwidth',
            value: 'Peak Bandwidth: 89.6 GB/s<br>Latency: Sub-60ns'
        }
    ],

    // Software OS features
    softwareOS: [
        {
            icon: '🖥️',
            title: 'TechFlow OS',
            description: 'Custom Linux-based operating system optimized for performance with real-time kernel and minimal overhead.'
        },
        {
            icon: '🔄',
            title: 'Automatic Updates',
            description: 'Seamless background updates with rollback capability ensure you always have the latest features and security patches.'
        },
        {
            icon: '🎨',
            title: 'Customizable Interface',
            description: 'Adaptive UI that changes based on your workflow with support for multiple desktop environments and themes.'
        }
    ],

    // Software applications
    softwareApps: [
        {
            label: 'Development Suite',
            value: 'Integrated IDE with AI-powered code completion, debugging tools, and version control integration'
        },
        {
            label: 'Data Analytics',
            value: 'Built-in data processing engine with machine learning libraries and visualization tools'
        },
        {
            label: 'Collaboration Tools',
            value: 'Video conferencing, real-time document editing, and project management integrated seamlessly'
        },
        {
            label: 'Security Center',
            value: 'Comprehensive security dashboard with threat monitoring, VPN, and encryption management'
        },
        {
            label: 'Cloud Integration',
            value: 'Native support for all major cloud providers with automated backup and sync capabilities'
        },
        {
            label: 'AI Assistant',
            value: 'Context-aware AI helper that learns your preferences and automates routine tasks'
        }
    ],

    // Software development tools
    softwareDevTools: [
        {
            icon: '💻',
            title: 'Multi-Language Support',
            description: 'Native support for Python, JavaScript, Go, Rust, C++, and 50+ other programming languages with optimized compilers.'
        },
        {
            icon: '🐳',
            title: 'Container Platform',
            description: '
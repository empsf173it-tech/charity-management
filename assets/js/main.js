document.addEventListener('DOMContentLoaded', function () {
    // === Theme Toggle Logic ===
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'bi bi-sun-fill text-warning';
        } else {
            themeIcon.className = 'bi bi-moon-fill text-dark';
        }
    }

    // === RTL Toggle Logic ===
    const rtlToggle = document.getElementById('rtlToggle');
    const bootstrapCss = document.getElementById('bootstrap-css');

    // Load saved layout preference
    const savedRtl = localStorage.getItem('rtl') === 'true';
    if (savedRtl) {
        applyRtl(true);
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isCurrentlyRtl = document.documentElement.getAttribute('dir') === 'rtl';
            applyRtl(!isCurrentlyRtl);
        });
    }

    function applyRtl(enable) {
        if (enable) {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
            if (bootstrapCss) {
                bootstrapCss.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css');
            }
            if (rtlToggle) rtlToggle.textContent = 'LTR';
            localStorage.setItem('rtl', 'true');
        } else {
            document.documentElement.removeAttribute('dir');
            document.documentElement.setAttribute('lang', 'en');
            if (bootstrapCss) {
                bootstrapCss.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
            }
            if (rtlToggle) rtlToggle.textContent = 'RTL';
            localStorage.setItem('rtl', 'false');
        }
    }

    // === Back-to-Top Button ===
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === Form Validation simulation ===
    const forms = document.querySelectorAll('.needs-validation');
    
    // Create Toast Element
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = '<i class="bi bi-check-circle-fill"></i> Thank you! Your action has been successfully processed.';
    document.body.appendChild(toast);

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                showToast();
                form.reset();
                form.classList.remove('was-validated');
                return;
            }
            form.classList.add('was-validated');
        }, false);
    });

    // === Donation Impact Calculator Logic ===
    const donationSlider = document.getElementById('donationSlider');
    const donationAmountText = document.getElementById('donationAmountText');
    const impactDescription = document.getElementById('impactDescription');

    if (donationSlider && donationAmountText && impactDescription) {
        const impacts = [
            { limit: 15, text: "Provides clean water for 1 child for a month." },
            { limit: 45, text: "Provides hot nutritional meals for 5 families for a week." },
            { limit: 80, text: "Supplies school kits and textbooks for 3 students." },
            { limit: 150, text: "Funds an emergency clinic checkup and vaccination for 2 mothers." },
            { limit: 300, text: "Provides high-yield organic seeds & tools for a smallholder farmer." },
            { limit: 500, text: "Sponsors water purification filters for a school block." }
        ];

        function updateImpact(value) {
            donationAmountText.textContent = `$${value}`;
            let desc = "Sponsors general relief & administration tools.";
            for (let item of impacts) {
                if (value <= item.limit) {
                    desc = item.text;
                    break;
                }
            }
            impactDescription.textContent = desc;
        }

        donationSlider.addEventListener('input', (e) => {
            updateImpact(e.target.value);
        });

        // Initialize
        updateImpact(donationSlider.value);
    }

    // === Live Incident Tracker Map Logic ===
    const incidentContainer = document.getElementById('incidentList');
    const reportIncidentForm = document.getElementById('reportIncidentForm');
    const activeAlertsCount = document.getElementById('activeAlertsCount');

    if (incidentContainer) {
        // Initial Mock Incidents
        let incidents = [
            { id: 1, title: "Flash Flood Relief Needed", location: "District A", severity: "Critical", desc: "Heavy rains caused flood blockage. Urgent blankets and drinking water needed.", x: 25, y: 35 },
            { id: 2, title: "Water Shortage Crisis", location: "Sector 4", severity: "High", desc: "Main well filter offline. Temporary water tanker trucks requested.", x: 65, y: 20 },
            { id: 3, title: "Medical Supply Shortage", location: "Rural Clinic B", severity: "Moderate", desc: "Out of basic antibiotic formulas and baby nutrition kits.", x: 45, y: 70 }
        ];

        function renderIncidents() {
            incidentContainer.innerHTML = '';
            incidents.forEach(inc => {
                const item = document.createElement('div');
                item.className = 'list-group-item list-group-item-action p-3 mb-2 border rounded-3 position-relative';
                item.style.cursor = 'pointer';
                
                const severityClass = inc.severity === 'Critical' ? 'bg-danger' : (inc.severity === 'High' ? 'bg-warning text-dark' : 'bg-info text-dark');
                
                item.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <h6 class="fw-bold mb-0">${inc.title}</h6>
                        <span class="badge ${severityClass}">${inc.severity}</span>
                    </div>
                    <small class="text-muted d-block mb-1"><i class="bi bi-geo-alt-fill"></i> ${inc.location}</small>
                    <p class="mb-0 text-muted small d-none d-md-block">${inc.desc}</p>
                `;
                
                // Show pin highlight on click
                item.addEventListener('click', () => {
                    highlightMapPin(inc);
                });
                incidentContainer.appendChild(item);
            });
            
            if (activeAlertsCount) {
                activeAlertsCount.textContent = incidents.length;
            }
            
            // Render Pins on Mock Map
            const mapArea = document.getElementById('mockMapArea');
            if (mapArea) {
                // Clear old pins
                const existingPins = mapArea.querySelectorAll('.map-pin');
                existingPins.forEach(p => p.remove());
                
                incidents.forEach(inc => {
                    const pin = document.createElement('div');
                    pin.className = 'map-pin position-absolute bg-danger border border-white rounded-circle shadow-lg';
                    pin.style.width = '16px';
                    pin.style.height = '16px';
                    pin.style.left = `${inc.x}%`;
                    pin.style.top = `${inc.y}%`;
                    pin.style.cursor = 'pointer';
                    pin.setAttribute('data-bs-toggle', 'tooltip');
                    pin.setAttribute('title', `${inc.title} (${inc.location})`);
                    
                    pin.addEventListener('click', () => {
                        alert(`Incident: ${inc.title}\nLocation: ${inc.location}\nDetails: ${inc.desc}`);
                    });
                    mapArea.appendChild(pin);
                });
            }
        }

        function highlightMapPin(inc) {
            const mapArea = document.getElementById('mockMapArea');
            if (!mapArea) return;
            let focusRing = document.getElementById('mapFocusRing');
            if (!focusRing) {
                focusRing = document.createElement('div');
                focusRing.id = 'mapFocusRing';
                focusRing.className = 'position-absolute border border-danger rounded-circle animate-ping';
                focusRing.style.width = '32px';
                focusRing.style.height = '32px';
                mapArea.appendChild(focusRing);
            }
            focusRing.style.left = `calc(${inc.x}% - 8px)`;
            focusRing.style.top = `calc(${inc.y}% - 8px)`;
            focusRing.style.display = 'block';
        }

        if (reportIncidentForm) {
            reportIncidentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('incTitle').value;
                const location = document.getElementById('incLocation').value;
                const severity = document.getElementById('incSeverity').value;
                const desc = document.getElementById('incDesc').value;
                
                if (title && location && severity) {
                    const newInc = {
                        id: incidents.length + 1,
                        title,
                        location,
                        severity,
                        desc: desc || "No additional description provided.",
                        x: Math.floor(Math.random() * 80) + 10,
                        y: Math.floor(Math.random() * 80) + 10
                    };
                    incidents.unshift(newInc);
                    renderIncidents();
                    reportIncidentForm.reset();
                    alert('Crisis incident submitted successfully. It is now live on our monitoring radar!');
                }
            });
        }

        renderIncidents();
    }
});

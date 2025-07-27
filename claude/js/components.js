// Component rendering functions
const Components = {
    // Render feature card
    renderFeatureCard: function(feature) {
        return `
            <div class="feature-card fade-in" tabindex="0">
                <div class="feature-icon">${feature.icon}</div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `;
    },

    // Render capability card
    renderCapabilityCard: function(capability) {
        return `
            <div class="capability-card fade-in" tabindex="0">
                <div class="feature-icon">${capability.icon}</div>
                <h3>${capability.title}</h3>
                <p>${capability.description}</p>
            </div>
        `;
    },

    // Render specification item
    renderSpecItem: function(spec) {
        return `
            <div class="spec-item fade-in" tabindex="0">
                <div class="spec-label">${spec.label}</div>
                <div>${spec.value}</div>
            </div>
        `;
    },

    // Render setup step
    renderStep: function(step) {
        return `
            <div class="step fade-in">
                <div class="step-number">${step.number}</div>
                <div class="step-content">
                    <h3>${step.title}</h3>
                    <p>${step.description}</p>
                </div>
            </div>
        `;
    },

    // Render loading skeleton
    renderSkeleton: function(type = 'card') {
        const skeletons = {
            card: `
                <div class="feature-card skeleton">
                    <div class="feature-icon skeleton"></div>
                    <div class="skeleton" style="height: 24px; margin-bottom: 8px; width: 60%;"></div>
                    <div class="skeleton" style="height: 16px; margin-bottom: 4px;"></div>
                    <div class="skeleton" style="height: 16px; width: 80%;"></div>
                </div>
            `,
            spec: `
                <div class="spec-item skeleton">
                    <div class="skeleton" style="height: 20px; margin-bottom: 8px; width: 40%;"></div>
                    <div class="skeleton" style="height: 16px; margin-bottom: 4px;"></div>
                    <div class="skeleton" style="height: 16px; width: 70%;"></div>
                </div>
            `,
            step: `
                <div class="step skeleton">
                    <div class="step-number skeleton"></div>
                    <div style="flex: 1;">
                        <div class="skeleton" style="height: 24px; margin-bottom: 8px; width: 50%;"></div>
                        <div class="skeleton" style="height: 16px; margin-bottom: 4px;"></div>
                        <div class="skeleton" style="height: 16px; width: 90%;"></div>
                    </div>
                </div>
            `
        };
        return skeletons[type] || skeletons.card;
    },

    // Render error message
    renderError: function(message = 'Failed to load content') {
        return `
            <div class="error-message" style="
                background: rgba(255, 107, 107, 0.1);
                border: 1px solid rgba(255, 107, 107, 0.3);
                border-radius: var(--radius-lg);
                padding: var(--spacing-lg);
                text-align: center;
                color: #ff6b6b;
            ">
                <div style="font-size: 2rem; margin-bottom: var(--spacing-sm);">⚠️</div>
                <h3 style="margin-bottom: var(--spacing-xs);">Error Loading Content</h3>
                <p>${message}</p>
                <button class="cta-button" onclick="location.reload()" style="margin-top: var(--spacing-sm);">
                    Retry
                </button>
            </div>
        `;
    },

    // Render empty state
    renderEmpty: function(message = 'No content available') {
        return `
            <div class="empty-state" style="
                text-align: center;
                padding: var(--spacing-xxl);
                opacity: 0.7;
            ">
                <div style="font-size: 3rem; margin-bottom: var(--spacing-sm);">📭</div>
                <h3 style="margin-bottom: var(--spacing-xs); color: var(--text-secondary);">Nothing Here Yet</h3>
                <p style="color: var(--text-secondary);">${message}</p>
            </div>
        `;
    },

    // Render search results
    renderSearchResults: function(results, searchTerm) {
        if (results.length === 0) {
            return this.renderEmpty(`No results found for "${searchTerm}"`);
        }

        return results.map(result => {
            // Highlight search term in results
            const highlightedTitle = result.title.replace(
                new RegExp(searchTerm, 'gi'),
                `<mark>$&</mark>`
            );
            const highlightedDesc = result.description.replace(
                new RegExp(searchTerm, 'gi'),
                `<mark>$&</mark>`
            );

            return `
                <div class="feature-card fade-in search-result">
                    <div class="feature-icon">${result.icon}</div>
                    <h3>${highlightedTitle}</h3>
                    <p>${highlightedDesc}</p>
                </div>
            `;
        }).join('');
    },

    // Render pagination
    renderPagination: function(currentPage, totalPages, onPageChange) {
        if (totalPages <= 1) return '';

        let pagination = '<div class="pagination" style="display: flex; justify-content: center; gap: var(--spacing-sm); margin: var(--spacing-lg) 0;">';
        
        // Previous button
        if (currentPage > 1) {
            pagination += `<button class="btn-secondary" onclick="${onPageChange}(${currentPage - 1})">← Previous</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === currentPage ? 'cta-button' : 'btn-secondary';
            pagination += `<button class="${isActive}" onclick="${onPageChange}(${i})">${i}</button>`;
        }

        // Next button
        if (currentPage < totalPages) {
            pagination += `<button class="btn-secondary" onclick="${onPageChange}(${currentPage + 1})">Next →</button>`;
        }

        pagination += '</div>';
        return pagination;
    },

    // Render breadcrumb navigation
    renderBreadcrumb: function(items) {
        return `
            <nav class="breadcrumb" style="margin-bottom: var(--spacing-lg);">
                <ol style="display: flex; gap: var(--spacing-xs); list-style: none;">
                    ${items.map((item, index) => `
                        <li>
                            ${index > 0 ? '<span style="color: var(--text-secondary); margin-right: var(--spacing-xs);">/</span>' : ''}
                            ${item.href ? 
                                `<a href="${item.href}" style="color: var(--accent-color);">${item.text}</a>` :
                                `<span style="color: var(--text-secondary);">${item.text}</span>`
                            }
                        </li>
                    `).join('')}
                </ol>
            </nav>
        `;
    },

    // Render modal
    renderModal: function(id, title, content, actions = []) {
        return `
            <div id="${id}" class="modal" style="
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                justify-content: center;
                align-items: center;
            ">
                <div class="modal-content" style="
                    background: var(--primary-bg);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: var(--spacing-lg);
                    max-width: 90%;
                    max-height: 90%;
                    overflow-y: auto;
                    position: relative;
                ">
                    <div class="modal-header" style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: var(--spacing-lg);
                        border-bottom: 1px solid var(--border-color);
                        padding-bottom: var(--spacing-sm);
                    ">
                        <h2 style="color: var(--accent-color);">${title}</h2>
                        <button onclick="closeModal('${id}')" style="
                            background: none;
                            border: none;
                            color: var(--text-secondary);
                            font-size: 1.5rem;
                            cursor: pointer;
                            padding: var(--spacing-xs);
                        ">×</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${actions.length > 0 ? `
                        <div class="modal-actions" style="
                            display: flex;
                            gap: var(--spacing-sm);
                            justify-content: flex-end;
                            margin-top: var(--spacing-lg);
                            padding-top: var(--spacing-sm);
                            border-top: 1px solid var(--border-color);
                        ">
                            ${actions.map(action => `
                                <button class="${action.primary ? 'cta-button' : 'btn-secondary'}" 
                                        onclick="${action.onclick}">
                                    ${action.text}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    // Render tooltip
    renderTooltip: function(content, position = 'top') {
        return `
            <div class="tooltip-content" style="
                position: absolute;
                ${position}: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: var(--primary-bg);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm);
                padding: var(--spacing-xs) var(--spacing-sm);
                font-size: var(--font-size-xs);
                white-space: nowrap;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all var(--transition-fast);
            ">
                ${content}
            </div>
        `;
    },

    // Render progress bar
    renderProgressBar: function(percentage, label = '') {
        return `
            <div class="progress-container" style="margin: var(--spacing-sm) 0;">
                ${label ? `<div class="progress-label" style="margin-bottom: var(--spacing-xs); color: var(--text-secondary);">${label}</div>` : ''}
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%;"></div>
                </div>
                <div class="progress-text" style="text-align: right; margin-top: var(--spacing-xs); font-size: var(--font-size-xs); color: var(--text-secondary);">
                    ${percentage}%
                </div>
            </div>
        `;
    },

    // Render notification
    renderNotification: function(message, type = 'info', duration = 5000) {
        const colors = {
            success: '#4ecdc4',
            error: '#ff6b6b',
            warning: '#ffd93d',
            info: '#45b7d1'
        };

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const id = `notification-${Date.now()}`;
        
        const notification = `
            <div id="${id}" class="notification" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-bg);
                border: 1px solid ${colors[type]};
                border-left: 4px solid ${colors[type]};
                border-radius: var(--radius-lg);
                padding: var(--spacing-sm) var(--spacing-md);
                max-width: 300px;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform var(--transition-normal);
                box-shadow: var(--shadow-lg);
            ">
                <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
                    <span style="font-size: 1.2rem;">${icons[type]}</span>
                    <span style="flex: 1; color: var(--text-primary);">${message}</span>
                    <button onclick="removeNotification('${id}')" style="
                        background: none;
                        border: none;
                        color: var(--text-secondary);
                        cursor: pointer;
                        padding: 0;
                        font-size: 1.2rem;
                    ">×</button>
                </div>
            </div>
        `;

        // Add to DOM and animate
        document.body.insertAdjacentHTML('beforeend', notification);
        
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.style.transform = 'translateX(0)';
            }
        }, 100);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.removeNotification(id);
            }, duration);
        }

        return id;
    },

    // Remove notification
    removeNotification: function(id) {
        const element = document.getElementById(id);
        if (element) {
            element.style.transform = 'translateX(100%)';
            setTimeout(() => {
                element.remove();
            }, 300);
        }
    }
};

// Global modal functions
window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
    }
};

window.openModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
    }
};

window.removeNotification = function(id) {
    Components.removeNotification(id);
};

// Component state management
const ComponentState = {
    // Track component states
    states: new Map(),
    
    // Set component state
    setState: function(id, state) {
        this.states.set(id, { ...this.states.get(id), ...state });
        this.triggerUpdate(id);
    },
    
    // Get component state
    getState: function(id) {
        return this.states.get(id) || {};
    },
    
    // Trigger component update
    triggerUpdate: function(id) {
        const event = new CustomEvent('componentUpdate', {
            detail: { id, state: this.getState(id) }
        });
        document.dispatchEvent(event);
    },
    
    // Clear component state
    clearState: function(id) {
        this.states.delete(id);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Components, ComponentState };
}
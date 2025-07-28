// Component rendering functions
const Components = {
    // Generic card renderer
    renderCard(item, type = 'feature') {
        const cssClass = `${type}-card fade-in`;
        return `
            <div class="${cssClass}" tabindex="0">
                ${item.icon ? `<div class="feature-icon">${item.icon}</div>` : ''}
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
    },

    // Render feature card
    renderFeatureCard(feature) {
        return this.renderCard(feature, 'feature');
    },

    // Render capability card
    renderCapabilityCard(capability) {
        return this.renderCard(capability, 'capability');
    },

    // Render specification item
    renderSpecItem(spec) {
        return `
            <div class="spec-item fade-in" tabindex="0">
                <div class="spec-label">${spec.label}</div>
                <div>${spec.value}</div>
            </div>
        `;
    },

    // Render setup step
    renderStep(step) {
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
    renderSkeleton(type = 'card') {
        const skeletons = {
            card: this.createSkeletonHTML('feature-card', [
                '<div class="feature-icon skeleton"></div>',
                '<div class="skeleton" style="height: 24px; margin-bottom: 8px; width: 60%;"></div>',
                '<div class="skeleton" style="height: 16px; margin-bottom: 4px;"></div>',
                '<div class="skeleton" style="height: 16px; width: 80%;"></div>'
            ]),
            spec: this.createSkeletonHTML('spec-item', [
                '<div class="skeleton" style="height: 20px; margin-bottom: 8px; width: 40%;"></div>',
                '<div class="skeleton" style="height: 16px; margin-bottom: 4px;"></div>',
                '<div class="skeleton" style="height: 16px; width: 70%;"></div>'
            ]),
            step: this.createSkeletonHTML('step', [
                '<div class="step-number skeleton"></div>',
                '<div style="flex: 1;">',
                '    <div class="skeleton" style="height: 24px; margin-bottom: 8px; width: 50%;"></div>',
                '    <div class="skeleton" style="height: 16px; margin-bottom: 4px;"></div>',
                '    <div class="skeleton" style="height: 16px; width: 90%;"></div>',
                '</div>'
            ])
        };
        return skeletons[type] || skeletons.card;
    },

    // Helper to create skeleton HTML
    createSkeletonHTML(className, content) {
        return `<div class="${className} skeleton">${content.join('')}</div>`;
    },

    // Render error message
    renderError(message = 'Failed to load content') {
        return this.createMessageBox({
            type: 'error',
            icon: '⚠️',
            title: 'Error Loading Content',
            message,
            background: 'rgba(255, 107, 107, 0.1)',
            borderColor: 'rgba(255, 107, 107, 0.3)',
            textColor: '#ff6b6b',
            action: {
                text: 'Retry',
                onclick: 'location.reload()'
            }
        });
    },

    // Render empty state
    renderEmpty(message = 'No content available') {
        return this.createMessageBox({
            type: 'empty',
            icon: '📭',
            title: 'Nothing Here Yet',
            message,
            textColor: 'var(--text-secondary)',
            centered: true
        });
    },

    // Generic message box creator
    createMessageBox(config) {
        const {
            type, icon, title, message, background, borderColor,
            textColor, action, centered = false
        } = config;

        const styles = background || borderColor ? `
            background: ${background || 'transparent'};
            ${borderColor ? `border: 1px solid ${borderColor};` : ''}
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
        ` : 'padding: var(--spacing-xxl);';

        return `
            <div class="${type}-${type === 'error' ? 'message' : 'state'}" style="
                ${styles}
                text-align: center;
                ${textColor ? `color: ${textColor};` : ''}
            ">
                <div style="font-size: ${type === 'error' ? '2rem' : '3rem'}; margin-bottom: var(--spacing-sm);">${icon}</div>
                <h3 style="margin-bottom: var(--spacing-xs);">${title}</h3>
                <p>${message}</p>
                ${action ? `
                    <button class="cta-button" onclick="${action.onclick}" style="margin-top: var(--spacing-sm);">
                        ${action.text}
                    </button>
                ` : ''}
            </div>
        `;
    },

    // Render search results
    renderSearchResults(results, searchTerm) {
        if (results.length === 0) {
            return this.renderEmpty(`No results found for "${searchTerm}"`);
        }

        return results.map(result => {
            const highlightText = (text) => text.replace(
                new RegExp(searchTerm, 'gi'),
                `<mark>$&</mark>`
            );

            return `
                <div class="feature-card fade-in search-result">
                    <div class="feature-icon">${result.icon}</div>
                    <h3>${highlightText(result.title)}</h3>
                    <p>${highlightText(result.description)}</p>
                </div>
            `;
        }).join('');
    },

    // Render pagination
    renderPagination(currentPage, totalPages, onPageChange) {
        if (totalPages <= 1) return '';

        const createButton = (page, text, isActive = false) => {
            const className = isActive ? 'cta-button' : 'btn-secondary';
            return `<button class="${className}" onclick="${onPageChange}(${page})">${text}</button>`;
        };

        let pagination = '<div class="pagination" style="display: flex; justify-content: center; gap: var(--spacing-sm); margin: var(--spacing-lg) 0;">';

        // Previous button
        if (currentPage > 1) {
            pagination += createButton(currentPage - 1, '← Previous');
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            pagination += createButton(i, i, i === currentPage);
        }

        // Next button
        if (currentPage < totalPages) {
            pagination += createButton(currentPage + 1, 'Next →');
        }

        return pagination + '</div>';
    },

    // Render breadcrumb navigation
    renderBreadcrumb(items) {
        const breadcrumbItems = items.map((item, index) => `
            <li>
                ${index > 0 ? '<span style="color: var(--text-secondary); margin-right: var(--spacing-xs);">/</span>' : ''}
                ${item.href ?
            `<a href="${item.href}" style="color: var(--accent-color);">${item.text}</a>` :
            `<span style="color: var(--text-secondary);">${item.text}</span>`
        }
            </li>
        `).join('');

        return `
            <nav class="breadcrumb" style="margin-bottom: var(--spacing-lg);">
                <ol style="display: flex; gap: var(--spacing-xs); list-style: none;">
                    ${breadcrumbItems}
                </ol>
            </nav>
        `;
    },

    // Render modal
    renderModal(id, title, content, actions = []) {
        const actionButtons = actions.map(action => `
            <button class="${action.primary ? 'cta-button' : 'btn-secondary'}" 
                    onclick="${action.onclick}">
                ${action.text}
            </button>
        `).join('');

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
                    <div class="modal-body">${content}</div>
                    ${actions.length > 0 ? `
                        <div class="modal-actions" style="
                            display: flex;
                            gap: var(--spacing-sm);
                            justify-content: flex-end;
                            margin-top: var(--spacing-lg);
                            padding-top: var(--spacing-sm);
                            border-top: 1px solid var(--border-color);
                        ">
                            ${actionButtons}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    // Render progress bar
    renderProgressBar(percentage, label = '') {
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
    renderNotification(message, type = 'info', duration = 5000) {
        const config = {
            success: { color: '#4ecdc4', icon: '✅' },
            error: { color: '#ff6b6b', icon: '❌' },
            warning: { color: '#ffd93d', icon: '⚠️' },
            info: { color: '#45b7d1', icon: 'ℹ️' }
        };

        const { color, icon } = config[type];
        const id = `notification-${Date.now()}`;

        const notification = `
            <div id="${id}" class="notification" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-bg);
                border: 1px solid ${color};
                border-left: 4px solid ${color};
                border-radius: var(--radius-lg);
                padding: var(--spacing-sm) var(--spacing-md);
                max-width: 300px;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform var(--transition-normal);
                box-shadow: var(--shadow-lg);
            ">
                <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
                    <span style="font-size: 1.2rem;">${icon}</span>
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
    removeNotification(id) {
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
const ModalManager = {
    close(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'none';
        }
    },

    open(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'flex';
        }
    }
};

// Global functions for inline event handlers
window.closeModal = (id) => ModalManager.close(id);
window.openModal = (id) => ModalManager.open(id);
window.removeNotification = (id) => Components.removeNotification(id);

// Component state management
const ComponentState = {
    states: new Map(),

    setState(id, state) {
        this.states.set(id, { ...this.states.get(id), ...state });
        this.triggerUpdate(id);
    },

    getState(id) {
        return this.states.get(id) || {};
    },

    triggerUpdate(id) {
        const event = new CustomEvent('componentUpdate', {
            detail: { id, state: this.getState(id) }
        });
        document.dispatchEvent(event);
    },

    clearState(id) {
        this.states.delete(id);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Components, ComponentState, ModalManager };
}
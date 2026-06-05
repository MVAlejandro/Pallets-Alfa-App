
// Componente card de acceso directo para index
export function AccessCard(container, ref, id, icon, text) {
    container.insertAdjacentHTML('beforeend',
        `<div class="col-6 col-lg-2 direct-access d-flex justify-content-center">
            <a href="${ref}" class="card access-card text-decoration-none">
                <div id="${id}-access" class="card-body d-flex flex-column justify-content-center align-items-center">
                    <div class="icon-square mb-3">
                        <i class="bi ${icon} icon-lg"></i>
                    </div>
                    <p class="fw-bold">${text}</p>
                </div>
            </a>
        </div>`);
};

// Componente card de aviso para index
export function AdviceCard(container, icon, type, title, body, date) {
    container.insertAdjacentHTML('beforeend',
        `<div class="col-md">
            <div class="card advice-card">
                <div class="card-header d-flex align-items-center">
                    <i class="bi ${icon}"></i>   
                    <p class="ps-2">${type}</p>
                </div>
                <div class="card-body p-4">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${body}</p>
                    <p class="advice-date pt-4">${date}</p>
                </div>
            </div>
        </div>`);
};

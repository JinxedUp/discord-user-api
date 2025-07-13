function isMobileDevice() { //holy shit code 
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  return mobileRegex.test(userAgent) || window.innerWidth <= 768;
}

function initMobileUI() {
  if (!isMobileDevice()) return;
  
  document.body.classList.add('mobile-ui');
  
  const mobileStyles = `
    <style id="mobile-styles">
      .mobile-ui {
        --mobile-primary: #6366f1;
        --mobile-secondary: #8b5cf6;
        --mobile-accent: #ec4899;
        --mobile-bg: #0f0f23;
        --mobile-surface: #1a1a2e;
        --mobile-text: #ffffff;
        --mobile-text-secondary: #a1a1aa;
      }
      
      .mobile-ui * {
        box-sizing: border-box;
      }
      
      .mobile-ui body {
        background: var(--mobile-bg);
        color: var(--mobile-text);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
      
      .mobile-ui .top-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .mobile-ui .top-bar h1 {
        font-size: 18px;
        font-weight: 700;
        margin: 0;
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .mobile-ui .copy-all-btn {
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
      }
      
      .mobile-ui .copy-all-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      }
      
      .mobile-ui .hero-section {
        padding: 120px 20px 60px;
        text-align: center;
        background: linear-gradient(135deg, var(--mobile-bg) 0%, var(--mobile-surface) 100%);
        position: relative;
        overflow: hidden;
      }
      
      .mobile-ui .hero-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
        pointer-events: none;
      }
      
      .mobile-ui .hero-title {
        font-size: 32px;
        font-weight: 800;
        margin-bottom: 16px;
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.2;
      }
      
      .mobile-ui .hero-subtitle {
        font-size: 16px;
        color: var(--mobile-text-secondary);
        margin-bottom: 32px;
        line-height: 1.5;
      }
      
      .mobile-ui .hero-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 32px;
      }
      
      .mobile-ui .stat-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 20px;
        text-align: center;
        backdrop-filter: blur(10px);
      }
      
      .mobile-ui .stat-number {
        font-size: 24px;
        font-weight: 700;
        color: var(--mobile-primary);
        margin-bottom: 4px;
      }
      
      .mobile-ui .stat-label {
        font-size: 12px;
        color: var(--mobile-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .mobile-ui .scroll-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        color: var(--mobile-text-secondary);
        font-size: 14px;
      }
      
      .mobile-ui .scroll-arrow {
        width: 24px;
        height: 24px;
        border: 2px solid var(--mobile-text-secondary);
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
        animation: bounce 2s infinite;
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: rotate(45deg) translateY(0); }
        40% { transform: rotate(45deg) translateY(-8px); }
        60% { transform: rotate(45deg) translateY(-4px); }
      }
      
      .mobile-ui .nav-menu {
        position: sticky;
        top: 60px;
        z-index: 100;
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 16px 20px;
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
      
      .mobile-ui .nav-menu::-webkit-scrollbar {
        display: none;
      }
      
      .mobile-ui .nav-links {
        display: flex;
        gap: 12px;
        padding: 0;
        margin: 0;
        list-style: none;
      }
      
      .mobile-ui .nav-link {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 8px 16px;
        color: var(--mobile-text);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        transition: all 0.2s ease;
      }
      
      .mobile-ui .nav-link:hover,
      .mobile-ui .nav-link.active {
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        border-color: transparent;
        color: white;
        transform: translateY(-1px);
      }
      
      .mobile-ui .main-content {
        padding: 20px;
        max-width: 100%;
      }
      
      .mobile-ui .api-section {
        margin-bottom: 40px;
        background: var(--mobile-surface);
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .mobile-ui .section-header {
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        padding: 20px;
        color: white;
      }
      
      .mobile-ui .section-title {
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 8px 0;
      }
      
      .mobile-ui .section-description {
        font-size: 14px;
        opacity: 0.9;
        margin: 0;
        line-height: 1.4;
      }
      
      .mobile-ui .api-cards {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .mobile-ui .api-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 20px;
        transition: all 0.2s ease;
      }
      
      .mobile-ui .api-card:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(99, 102, 241, 0.3);
        transform: translateY(-2px);
      }
      
      .mobile-ui .endpoint-method {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 8px;
      }
      
      .mobile-ui .method-get { background: #10b981; color: white; }
      .mobile-ui .method-post { background: #3b82f6; color: white; }
      .mobile-ui .method-put { background: #f59e0b; color: white; }
      .mobile-ui .method-delete { background: #ef4444; color: white; }
      .mobile-ui .method-patch { background: #8b5cf6; color: white; }
      
      .mobile-ui .endpoint-path {
        font-family: 'Fira Mono', monospace;
        font-size: 14px;
        color: var(--mobile-text);
        margin-bottom: 12px;
        word-break: break-all;
        line-height: 1.4;
      }
      
      .mobile-ui .endpoint-description {
        font-size: 14px;
        color: var(--mobile-text-secondary);
        margin-bottom: 12px;
        line-height: 1.5;
      }
      
      .mobile-ui .code-block {
        background: #1e1b4b;
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 12px;
        padding: 16px;
        margin: 12px 0;
        overflow-x: auto;
        font-family: 'Fira Mono', monospace;
        font-size: 13px;
        line-height: 1.4;
      }
      
      .mobile-ui .code-block pre {
        margin: 0;
        color: #e2e8f0;
      }
      
      .mobile-ui .copy-btn {
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 8px;
      }
      
      .mobile-ui .copy-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
      }
      
      .mobile-ui .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
        transition: all 0.2s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .mobile-ui .scroll-to-top:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
      }
      
      .mobile-ui .toast {
        position: fixed;
        top: 80px;
        left: 20px;
        right: 20px;
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 16px;
        color: white;
        font-size: 14px;
        z-index: 10000;
        transform: translateY(-100px);
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      .mobile-ui .toast.show {
        transform: translateY(0);
        opacity: 1;
      }
      
      .mobile-ui .toast.success {
        border-left: 4px solid #10b981;
      }
      
      .mobile-ui .toast.error {
        border-left: 4px solid #ef4444;
      }
      
      @media (max-width: 480px) {
        .mobile-ui .hero-title {
          font-size: 28px;
        }
        
        .mobile-ui .hero-stats {
          grid-template-columns: 1fr;
        }
        
        .mobile-ui .nav-menu {
          padding: 12px 16px;
        }
        
        .mobile-ui .nav-link {
          padding: 6px 12px;
          font-size: 13px;
        }
        
        .mobile-ui .main-content {
          padding: 16px;
        }
        
        .mobile-ui .api-section {
          margin-bottom: 24px;
        }
        
        .mobile-ui .section-header {
          padding: 16px;
        }
        
        .mobile-ui .api-cards {
          padding: 16px;
        }
      }
      
      .mobile-ui .hero-section {
        padding: 120px 20px 60px;
        text-align: center;
        background: linear-gradient(135deg, var(--mobile-bg) 0%, var(--mobile-surface) 100%);
        position: relative;
        overflow: hidden;
      }
      
      .mobile-ui .hero-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
        pointer-events: none;
      }
      
      .mobile-ui .hero-title {
        font-size: 32px;
        font-weight: 800;
        margin-bottom: 16px;
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.2;
      }
      
      .mobile-ui .hero-subtitle {
        font-size: 16px;
        color: var(--mobile-text-secondary);
        margin-bottom: 32px;
        line-height: 1.5;
      }
      
      .mobile-ui .hero-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 32px;
      }
      
      .mobile-ui .stat-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 20px;
        text-align: center;
        backdrop-filter: blur(10px);
      }
      
      .mobile-ui .stat-number {
        font-size: 24px;
        font-weight: 700;
        color: var(--mobile-primary);
        margin-bottom: 4px;
      }
      
      .mobile-ui .stat-label {
        font-size: 12px;
        color: var(--mobile-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .mobile-ui .scroll-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        color: var(--mobile-text-secondary);
        font-size: 14px;
      }
      
      .mobile-ui .scroll-arrow {
        width: 24px;
        height: 24px;
        border: 2px solid var(--mobile-text-secondary);
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
        animation: bounce 2s infinite;
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: rotate(45deg) translateY(0); }
        40% { transform: rotate(45deg) translateY(-8px); }
        60% { transform: rotate(45deg) translateY(-4px); }
      }
      
      .mobile-ui .nav-menu {
        position: sticky;
        top: 60px;
        z-index: 100;
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 16px 20px;
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
      
      .mobile-ui .nav-menu::-webkit-scrollbar {
        display: none;
      }
      
      .mobile-ui .nav-links {
        display: flex;
        gap: 12px;
        padding: 0;
        margin: 0;
        list-style: none;
      }
      
      .mobile-ui .nav-link {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 8px 16px;
        color: var(--mobile-text);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        transition: all 0.2s ease;
      }
      
      .mobile-ui .nav-link:hover,
      .mobile-ui .nav-link.active {
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        border-color: transparent;
        color: white;
        transform: translateY(-1px);
      }
      
      .mobile-ui .main-content {
        padding: 20px;
        max-width: 100%;
      }
      
      .mobile-ui .api-section {
        margin-bottom: 40px;
        background: var(--mobile-surface);
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .mobile-ui .section-header {
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        padding: 20px;
        color: white;
      }
      
      .mobile-ui .section-title {
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 8px 0;
      }
      
      .mobile-ui .section-description {
        font-size: 14px;
        opacity: 0.9;
        margin: 0;
        line-height: 1.4;
      }
      
      .mobile-ui .api-cards {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .mobile-ui .api-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 20px;
        transition: all 0.2s ease;
      }
      
      .mobile-ui .api-card:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(99, 102, 241, 0.3);
        transform: translateY(-2px);
      }
      
      .mobile-ui .endpoint-method {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 8px;
      }
      
      .mobile-ui .method-get { background: #10b981; color: white; }
      .mobile-ui .method-post { background: #3b82f6; color: white; }
      .mobile-ui .method-put { background: #f59e0b; color: white; }
      .mobile-ui .method-delete { background: #ef4444; color: white; }
      .mobile-ui .method-patch { background: #8b5cf6; color: white; }
      
      .mobile-ui .endpoint-path {
        font-family: 'Fira Mono', monospace;
        font-size: 14px;
        color: var(--mobile-text);
        margin-bottom: 12px;
        word-break: break-all;
        line-height: 1.4;
      }
      
      .mobile-ui .endpoint-description {
        font-size: 14px;
        color: var(--mobile-text-secondary);
        margin-bottom: 12px;
        line-height: 1.5;
      }
      
      .mobile-ui .code-block {
        background: #1e1b4b;
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 12px;
        padding: 16px;
        margin: 12px 0;
        overflow-x: auto;
        font-family: 'Fira Mono', monospace;
        font-size: 13px;
        line-height: 1.4;
      }
      
      .mobile-ui .code-block pre {
        margin: 0;
        color: #e2e8f0;
      }
      
      .mobile-ui .copy-btn {
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 8px;
      }
      
      .mobile-ui .copy-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
      }
      
      .mobile-ui .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
        transition: all 0.2s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .mobile-ui .scroll-to-top:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
      }
      
      .mobile-ui .toast {
        position: fixed;
        top: 80px;
        left: 20px;
        right: 20px;
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 16px;
        color: white;
        font-size: 14px;
        z-index: 10000;
        transform: translateY(-100px);
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      .mobile-ui .toast.show {
        transform: translateY(0);
        opacity: 1;
      }
      
      .mobile-ui .toast.success {
        border-left: 4px solid #10b981;
      }
      
      .mobile-ui .toast.error {
        border-left: 4px solid #ef4444;
      }
      
      @media (max-width: 480px) {
        .mobile-ui .hero-title {
          font-size: 28px;
        }
        
        .mobile-ui .hero-stats {
          grid-template-columns: 1fr;
        }
        
        .mobile-ui .nav-menu {
          padding: 12px 16px;
        }
        
        .mobile-ui .nav-link {
          padding: 6px 12px;
          font-size: 13px;
        }
        
        .mobile-ui .main-content {
          padding: 16px;
        }
        
        .mobile-ui .api-section {
          margin-bottom: 24px;
        }
        
        .mobile-ui .section-header {
          padding: 16px;
        }
        
        .mobile-ui .api-cards {
          padding: 16px;
        }
      }
      
      .mobile-ui .hero-section {
        padding: 120px 20px 60px;
        text-align: center;
        background: linear-gradient(135deg, var(--mobile-bg) 0%, var(--mobile-surface) 100%);
        position: relative;
        overflow: hidden;
      }
      
      .mobile-ui .hero-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
        pointer-events: none;
      }
      
      .mobile-ui .hero-title {
        font-size: 32px;
        font-weight: 800;
        margin-bottom: 16px;
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 1.2;
      }
      
      .mobile-ui .hero-subtitle {
        font-size: 16px;
        color: var(--mobile-text-secondary);
        margin-bottom: 32px;
        line-height: 1.5;
      }
      
      .mobile-ui .hero-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 32px;
      }
      
      .mobile-ui .stat-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 20px;
        text-align: center;
        backdrop-filter: blur(10px);
      }
      
      .mobile-ui .stat-number {
        font-size: 24px;
        font-weight: 700;
        color: var(--mobile-primary);
        margin-bottom: 4px;
      }
      
      .mobile-ui .stat-label {
        font-size: 12px;
        color: var(--mobile-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .mobile-ui .scroll-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        color: var(--mobile-text-secondary);
        font-size: 14px;
      }
      
      .mobile-ui .scroll-arrow {
        width: 24px;
        height: 24px;
        border: 2px solid var(--mobile-text-secondary);
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
        animation: bounce 2s infinite;
      }
      
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: rotate(45deg) translateY(0); }
        40% { transform: rotate(45deg) translateY(-8px); }
        60% { transform: rotate(45deg) translateY(-4px); }
      }
      
      .mobile-ui .nav-menu {
        position: sticky;
        top: 60px;
        z-index: 100;
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 16px 20px;
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
      
      .mobile-ui .nav-menu::-webkit-scrollbar {
        display: none;
      }
      
      .mobile-ui .nav-links {
        display: flex;
        gap: 12px;
        padding: 0;
        margin: 0;
        list-style: none;
      }
      
      .mobile-ui .nav-link {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 8px 16px;
        color: var(--mobile-text);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        transition: all 0.2s ease;
      }
      
      .mobile-ui .nav-link:hover,
      .mobile-ui .nav-link.active {
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        border-color: transparent;
        color: white;
        transform: translateY(-1px);
      }
      
      .mobile-ui .main-content {
        padding: 20px;
        max-width: 100%;
      }
      
      .mobile-ui .api-section {
        margin-bottom: 40px;
        background: var(--mobile-surface);
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .mobile-ui .section-header {
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        padding: 20px;
        color: white;
      }
      
      .mobile-ui .section-title {
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 8px 0;
      }
      
      .mobile-ui .section-description {
        font-size: 14px;
        opacity: 0.9;
        margin: 0;
        line-height: 1.4;
      }
      
      .mobile-ui .api-cards {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .mobile-ui .api-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 20px;
        transition: all 0.2s ease;
      }
      
      .mobile-ui .api-card:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(99, 102, 241, 0.3);
        transform: translateY(-2px);
      }
      
      .mobile-ui .endpoint-method {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 8px;
      }
      
      .mobile-ui .method-get { background: #10b981; color: white; }
      .mobile-ui .method-post { background: #3b82f6; color: white; }
      .mobile-ui .method-put { background: #f59e0b; color: white; }
      .mobile-ui .method-delete { background: #ef4444; color: white; }
      .mobile-ui .method-patch { background: #8b5cf6; color: white; }
      
      .mobile-ui .endpoint-path {
        font-family: 'Fira Mono', monospace;
        font-size: 14px;
        color: var(--mobile-text);
        margin-bottom: 12px;
        word-break: break-all;
        line-height: 1.4;
      }
      
      .mobile-ui .endpoint-description {
        font-size: 14px;
        color: var(--mobile-text-secondary);
        margin-bottom: 12px;
        line-height: 1.5;
      }
      
      .mobile-ui .code-block {
        background: #1e1b4b;
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 12px;
        padding: 16px;
        margin: 12px 0;
        overflow-x: auto;
        font-family: 'Fira Mono', monospace;
        font-size: 13px;
        line-height: 1.4;
      }
      
      .mobile-ui .code-block pre {
        margin: 0;
        color: #e2e8f0;
      }
      
      .mobile-ui .copy-btn {
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-top: 8px;
      }
      
      .mobile-ui .copy-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
      }
      
      .mobile-ui .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary));
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
        transition: all 0.2s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .mobile-ui .scroll-to-top:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
      }
      
      .mobile-ui .toast {
        position: fixed;
        top: 80px;
        left: 20px;
        right: 20px;
        background: rgba(15, 15, 35, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 16px;
        color: white;
        font-size: 14px;
        z-index: 10000;
        transform: translateY(-100px);
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      .mobile-ui .toast.show {
        transform: translateY(0);
        opacity: 1;
      }
      
      .mobile-ui .toast.success {
        border-left: 4px solid #10b981;
      }
      
      .mobile-ui .toast.error {
        border-left: 4px solid #ef4444;
      }
      
      @media (max-width: 480px) {
        .mobile-ui .hero-title {
          font-size: 28px;
        }
        
        .mobile-ui .hero-stats {
          grid-template-columns: 1fr;
        }
        
        .mobile-ui .nav-menu {
          padding: 12px 16px;
        }
        
        .mobile-ui .nav-link {
          padding: 6px 12px;
          font-size: 13px;
        }
        
        .mobile-ui .main-content {
          padding: 16px;
        }
        
        .mobile-ui .api-section {
          margin-bottom: 24px;
        }
        
        .mobile-ui .section-header {
          padding: 16px;
        }
        
        .mobile-ui .api-cards {
          padding: 16px;
        }
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', mobileStyles);
}



function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 80;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 6 + 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
    
    particle.style.borderRadius = '50%';
    particle.style.background = `radial-gradient(circle, 
      rgba(139, 92, 246, ${0.2 + Math.random() * 0.3}) 0%, 
      rgba(236, 72, 153, ${0.1 + Math.random() * 0.2}) 100%
    )`;
    particle.style.boxShadow = `0 0 ${size * 2}px rgba(139, 92, 246, 0.4)`;
    
    particlesContainer.appendChild(particle);
  }
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 120;
        
        const startPosition = window.pageYOffset;
        const distance = offsetTop - startPosition;
        const duration = 800;
        let start = null;
        
        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function easeInOutCubic(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t * t + b;
          t -= 2;
          return c / 2 * (t * t * t + 2) + b;
        }
        
        requestAnimationFrame(animation);
      }
    });
  });

  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = `
    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
  `;
  scrollToTopBtn.className = 'fixed bottom-8 right-8 z-[9999] w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 border-2 border-purple-400/30 hover:border-purple-400/60 backdrop-blur-sm';
  scrollToTopBtn.id = 'scrollToTop';
  scrollToTopBtn.style.display = 'flex';
  scrollToTopBtn.style.alignItems = 'center';
  scrollToTopBtn.style.justifyContent = 'center';
  scrollToTopBtn.style.opacity = '0';
  scrollToTopBtn.style.pointerEvents = 'none';
  scrollToTopBtn.style.transform = 'translateY(10px)';
  scrollToTopBtn.style.position = 'fixed';
  scrollToTopBtn.style.bottom = '2rem';
  scrollToTopBtn.style.right = '2rem';
  scrollToTopBtn.style.zIndex = '9999';
  document.body.appendChild(scrollToTopBtn);

  console.log('Scroll to top button created:', scrollToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.pointerEvents = 'auto';
      scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.pointerEvents = 'none';
      scrollToTopBtn.style.transform = 'translateY(10px)';
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    const scrollToTop = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    };
    scrollToTop();
    
    scrollToTopBtn.style.filter = 'brightness(1.3) scale(1.1)';
    scrollToTopBtn.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.6)';
    
    const ripple = document.createElement('div');
    ripple.className = 'absolute inset-0 rounded-full bg-white/20 animate-ping';
    scrollToTopBtn.appendChild(ripple);
    
    setTimeout(() => {
      scrollToTopBtn.style.filter = 'brightness(1) scale(1)';
      scrollToTopBtn.style.boxShadow = '';
      ripple.remove();
    }, 300);
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        const children = entry.target.querySelectorAll('.animate-on-scroll');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate-fade-in-up');
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, index * 120);
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .section-card').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
  });
}

function initParallaxEffects() {
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
}

function initTypingEffect() {
  const heroTitle = document.querySelector('.gradient-text');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    };
    setTimeout(typeWriter, 300);
  }
}

function copyToClipboard(text) {
  if (!navigator.clipboard) {

    fallbackCopyToClipboard(text);
    return;
  }
  
  navigator.clipboard.writeText(text).then(() => {
    if (isMobileDevice()) {
      showMobileToast('Copied to clipboard!', 'success');
    } else {
      showToast('Copied to clipboard!', 'success');
    }
  }).catch((err) => {
    console.error('Clipboard API failed:', err);
    fallbackCopyToClipboard(text);
  });
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      if (isMobileDevice()) {
        showMobileToast('Copied to clipboard!', 'success');
      } else {
        showToast('Copied to clipboard!', 'success');
      }
    } else {
      if (isMobileDevice()) {
        showMobileToast('Failed to copy - please copy manually', 'error');
      } else {
        showToast('Failed to copy - please copy manually', 'error');
      }
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
    if (isMobileDevice()) {
      showMobileToast('Failed to copy - please copy manually', 'error');
    } else {
      showToast('Failed to copy - please copy manually', 'error');
    }
  }
  
  document.body.removeChild(textArea);
}

function animateCopyButton(button) {
  if (isMobileDevice()) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = 'linear-gradient(135deg, var(--mobile-primary), var(--mobile-secondary))';
      button.style.transform = 'scale(1)';
    }, 1500);
  } else {
    const copyText = button.querySelector('.copy-text');
    const copyCheckmark = button.querySelector('.copy-checkmark');
    
    if (copyText && copyCheckmark) {
      copyText.style.opacity = '0';
      copyText.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        copyCheckmark.style.opacity = '1';
        copyCheckmark.style.transform = 'scale(1)';
      }, 150);
      
      button.classList.add('bg-green-600/40');
      button.style.filter = 'brightness(1.2)';
      
      setTimeout(() => {
        copyCheckmark.style.opacity = '0';
        copyCheckmark.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          copyText.style.opacity = '1';
          copyText.style.transform = 'scale(1)';
        }, 150);
        
        button.classList.remove('bg-green-600/40');
        button.style.filter = 'brightness(1)';
      }, 1500);
    } else {
      const originalContent = button.innerHTML;
  const checkmarkSVG = `
    <svg class="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
  `;
  
  button.innerHTML = checkmarkSVG;
  button.classList.add('bg-green-600/40');
  button.style.filter = 'brightness(1.2)';
  
  setTimeout(() => {
    button.innerHTML = originalContent;
    button.classList.remove('bg-green-600/40');
    button.style.filter = 'brightness(1)';
  }, 1500);
    }
  }
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = toast.querySelector('svg');
  const toastContainer = toast.querySelector('div');
  
  toastMessage.textContent = message;
  

  if (type === 'error') {
    toastContainer.className = 'glass-effect bg-red-600/20 border border-red-500/30 rounded-lg px-6 py-4 shadow-lg';
    toastIcon.parentElement.className = 'w-6 h-6 bg-red-500 rounded-full flex items-center justify-center';
    toastIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
    toastMessage.className = 'text-red-200 font-medium';
  } else {
    toastContainer.className = 'glass-effect bg-green-600/20 border border-green-500/30 rounded-lg px-6 py-4 shadow-lg';
    toastIcon.parentElement.className = 'w-6 h-6 bg-green-500 rounded-full flex items-center justify-center';
    toastIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';
    toastMessage.className = 'text-green-200 font-medium';
  }
  
  
  toast.classList.remove('translate-x-full', 'opacity-0');
  
  
  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
  }, type === 'error' ? 4000 : 3000);
}

function showMobileToast(message, type = 'success') {
  const existingToast = document.querySelector('.mobile-ui .toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="flex-shrink-0">
        ${type === 'success' ? 
          '<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' :
          '<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
        }
      </div>
      <span class="text-sm font-medium">${message}</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, type === 'error' ? 4000 : 3000);
}

function copyAllEndpoints() {
  const endpoints = [
    'GET /users/@me',
    'GET /users/{user.id}',
    'PATCH /users/@me',
    'POST /channels/{channel.id}/messages',
    'PATCH /channels/{channel.id}/messages/{message.id}',
    'DELETE /channels/{channel.id}/messages/{message.id}',
    'POST /guilds/{guild.id}/channels',
    'GET /channels/{channel.id}',
    'DELETE /channels/{channel.id}',
    'GET /guilds/{guild.id}',
    'PATCH /guilds/{guild.id}',
    'GET /guilds/{guild.id}/members',
    'POST /channels/{channel.id}/webhooks',
    'POST /webhooks/{webhook.id}/{webhook.token}',
    'DELETE /webhooks/{webhook.id}'
  ];
  copyToClipboard(endpoints.join('\n'));
}

function addSectionEffects() {
  document.querySelectorAll('section').forEach(section => {
    if (!section.closest('nav')) {
      section.addEventListener('mouseenter', () => {
        section.style.transform = 'translateY(-6px)';
        section.style.filter = 'brightness(1.05)';
      });
      
      section.addEventListener('mouseleave', () => {
        section.style.transform = 'translateY(0)';
        section.style.filter = 'brightness(1)';
      });
    }
  });
}

function addCardEffects() {
  document.querySelectorAll('.glass-effect').forEach(card => {
    if (!card.closest('nav')) {
      card.addEventListener('click', () => {
        card.style.transition = 'all 0.2s ease';
        card.style.filter = 'brightness(1.1) saturate(1.1)';
        setTimeout(() => {
          card.style.filter = 'brightness(1) saturate(1)';
        }, 200);
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.id = 'loading';
  loadingIndicator.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center';
  loadingIndicator.innerHTML = `
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-purple-200 text-lg font-medium">Loading Discord API Reference...</p>
    </div>
  `;
  document.body.appendChild(loadingIndicator);
  
  try {
    if (isMobileDevice()) {
      initMobileUI();
    } else {
  createParticles();
  
  initSmoothScrolling();
  
      // initScrollAnimations();
  
  initParallaxEffects();
  
  initTypingEffect();
  
  addSectionEffects();
  addCardEffects();
    }
  
    if (!isMobileDevice()) {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const endpoint = btn.getAttribute('data-endpoint');
      copyToClipboard(endpoint);
      animateCopyButton(btn);
    });
  });

  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const code = btn.getAttribute('data-code');
      copyToClipboard(code);
      animateCopyButton(btn);
    });
  });

  const copyAllBtn = document.getElementById('copyAll');
  if (copyAllBtn) {
    copyAllBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      copyAllEndpoints();
      animateCopyButton(copyAllBtn);
    });
  }

    if (isMobileDevice()) {
      const mobileCopyAllBtn = document.querySelector('.copy-all-btn');
      if (mobileCopyAllBtn) {
        mobileCopyAllBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          copyAllEndpoints();
          animateCopyButton(mobileCopyAllBtn);
        });
      }
    }
    }

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
        showToast('Theme toggle coming soon!', 'success');
      });
    }
    
    setTimeout(() => {
      loadingIndicator.style.opacity = '0';
      setTimeout(() => {
        loadingIndicator.remove();
      }, 300);
    }, 500);
    
  } catch (error) {
    console.error('Error initializing Discord API Reference:', error);
    showToast('Some features may not work properly', 'error');
    
    setTimeout(() => {
      loadingIndicator.style.opacity = '0';
      setTimeout(() => {
        loadingIndicator.remove();
      }, 300);
    }, 1000);
  }
}); 

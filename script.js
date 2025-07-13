function createParticles() { //js is my biggest weakness
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
    showToast('Copied to clipboard!', 'success');
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
      showToast('Copied to clipboard!', 'success');
    } else {
      showToast('Failed to copy - please copy manually', 'error');
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
    showToast('Failed to copy - please copy manually', 'error');
  }
  
  document.body.removeChild(textArea);
}

function animateCopyButton(button) {
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

function copyAllEndpoints() {
  const endpoints = [
    'PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me',
    'DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me',
    'POST /channels/{channel_id}/messages',
    'PATCH /channels/{channel_id}/messages/{message_id}',
    'DELETE /channels/{channel_id}/messages/{message_id}',
    'GET /channels/{channel_id}/messages?limit=50',
    'GET /users/@me',
    'PATCH /users/@me'
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
    createParticles();
    
    initSmoothScrolling();
    
    initScrollAnimations();
    
    initParallaxEffects();
    
    initTypingEffect();
    
    addSectionEffects();
    addCardEffects();
    
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

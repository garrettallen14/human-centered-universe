document.addEventListener('DOMContentLoaded', function() {
    const triggers = document.querySelectorAll('.popup-trigger');
    let activePopup = null;
    let isClicked = false;
  
    triggers.forEach(trigger => {
      const popupContent = trigger.querySelector('.popup-content');
  
      trigger.addEventListener('mouseenter', () => showPopup(trigger, popupContent, false));
      trigger.addEventListener('mouseleave', () => hidePopup(popupContent));
      trigger.addEventListener('click', (e) => togglePopup(e, trigger, popupContent));
    });
  
    function showPopup(trigger, popupContent, isFixed) {
      if (activePopup && activePopup !== popupContent) {
        hidePopup(activePopup);
      }
      positionPopup(trigger, popupContent, isFixed);
      popupContent.classList.add('visible');
      popupContent.classList.toggle('fixed', isFixed);
      activePopup = popupContent;
    }
  
    function hidePopup(popupContent) {
      if (!isClicked) {
        popupContent.classList.remove('visible', 'fixed');
        activePopup = null;
      }
    }
  
    function togglePopup(e, trigger, popupContent) {
      e.preventDefault();
      isClicked = !isClicked;
      if (isClicked) {
        showPopup(trigger, popupContent, true);
      } else {
        hidePopup(popupContent);
      }
    }
  
    function positionPopup(trigger, popupContent, isFixed) {
      const rect = trigger.getBoundingClientRect();
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
      let top, left;
  
      if (isFixed) {
        // For clicked state, center in the viewport
        top = viewportHeight / 2 - popupContent.offsetHeight / 2;
        left = viewportWidth / 2 - popupContent.offsetWidth / 2;
      } else {
        // For hover state, center horizontally over text, vertically in the middle of the screen
        top = viewportHeight / 2 - popupContent.offsetHeight / 2;
        left = rect.left + rect.width / 2 - popupContent.offsetWidth / 2;
        
        // Adjust for scroll position
        top += window.pageYOffset;
        left += window.pageXOffset;
      }
  
      popupContent.style.top = `${top}px`;
      popupContent.style.left = `${left}px`;
    }
  
    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.popup-trigger') && activePopup) {
        hidePopup(activePopup);
        isClicked = false;
      }
    });
  
    // Reposition popups on window resize
    window.addEventListener('resize', function() {
      if (activePopup) {
        const trigger = activePopup.closest('.popup-trigger');
        positionPopup(trigger, activePopup, isClicked);
      }
    });
  
    // Reposition non-fixed popup on scroll
    window.addEventListener('scroll', function() {
      if (activePopup && !isClicked) {
        const trigger = activePopup.closest('.popup-trigger');
        positionPopup(trigger, activePopup, false);
      }
    });
  });
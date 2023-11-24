document.addEventListener('DOMContentLoaded', function() {
    
    const checkboxes = document.querySelectorAll('.chocolate-checkbox');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const totalPriceElement = document.getElementById('price');
    const selectedItemsElement = document.getElementById('selected-items');
  
    checkboxes.forEach(function(checkbox, index) {
        checkbox.addEventListener('change', updateTotal);
        quantityInputs[index].addEventListener('input', updateTotal);
    });
  
    function updateTotal() {
        let totalPrice = 0;
        let selectedItems = 0;
  
        checkboxes.forEach(function(checkbox, index) {
            const quantity = parseInt(quantityInputs[index].value) || 0;
  
            if (checkbox.checked && quantity > 0) {
                if (selectedItems + quantity <= 8) {
                    totalPrice += quantity * parseInt(checkbox.getAttribute('data-price'));
                    selectedItems += quantity;
                } else {
                    const remainingQuantity = 8 - selectedItems;
                    quantityInputs[index].value = remainingQuantity;
                    totalPrice += remainingQuantity * parseInt(checkbox.getAttribute('data-price'));
                    selectedItems = 8;
                }
            }
        });
  
        totalPriceElement.textContent = totalPrice;
        selectedItemsElement.textContent = selectedItems;
  
        checkboxes.forEach(function(checkbox, index) {
            const checkboxValue = checkbox.checked && parseInt(quantityInputs[index].value) > 0;
            checkbox.disabled = selectedItems >= 8 && !checkboxValue;
            quantityInputs[index].disabled = selectedItems >= 8 && !checkboxValue;
        });
    }
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');

    
 
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/dogs');
        const data = await response.json();
  
        dataContainer.innerHTML = '';
        data.forEach(item => {
          const element = document.createElement('div');
          element.textContent = item.value; 
          dataContainer.appendChild(element);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    
    async function updateData(id, newData) {
      try {
        const response = await fetch(`https://your-api-endpoint/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
      
        fetchData();
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  
    dataContainer.addEventListener('click', (event) => {
      const element = event.target;
      const id = element.dataset.id; 
  
    
      const newData = {
        value: element.textContent};
      updateData(id, newData);
    });
  
    fetchData(); 
  });
  
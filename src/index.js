document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');
  
    function fetchDogs() {
      fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => {
          tableBody.innerHTML = '';
          dogs.forEach(dog => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${dog.name}</td>
              <td>${dog.breed}</td>
              <td>${dog.sex}</td>
              <td><button class="edit-button" data-id="${dog.id}">Edit</button></td>
            `;
            tableBody.appendChild(row);
          });
        })
        .catch(error => console.error('Error fetching dogs:', error));
    }
  
    dogForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const dogId = dogForm.dataset.dogId;
      const name = event.target.elements.name.value;
      const breed = event.target.elements.breed.value;
      const sex = event.target.elements.sex.value;
  
      fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, breed, sex })
      })
      .then(() => {
        dogForm.dataset.dogId = '';
        dogForm.reset();
        fetchDogs();
      })
      .catch(error => console.error('Error updating dog:', error));
    });
  
    tableBody.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-button')) {
        const dogId = event.target.dataset.id;
        fetch(`http://localhost:3000/dogs/${dogId}`)
          .then(response => response.json())
          .then(dog => {
            dogForm.dataset.dogId = dog.id;
            dogForm.elements.name.value = dog.name;
            dogForm.elements.breed.value = dog.breed;
            dogForm.elements.sex.value = dog.sex;
          })
          .catch(error => console.error('Error fetching dog:', error));
      }
    });
  
    fetchDogs();
  });
  
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

// create element and render cafe
function renderCafe(doc){
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';

li.appendChild(name);
li.appendChild(city);
li.appendChild(cross);

cafeList.appendChild(li);

// deleting data
cross.addEventListener('click', (e) => {
  e.stopPropagation();
  let id = e.target.parentElement.getAttribute('data-id');
  db.collection('cafes').doc(id).delete();
})

}

// getting data
/*db.collection('cafes').orderBy('city').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    console.log(doc.data())
    renderCafe(doc);
  })
})*/

// saving data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value
  });
  form.name.value = '';
  form.city.value = '';
})

// realt-time listener (getting data)
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    console.log(change.doc.data());
    if(change.type == 'added'){
      renderCafe(change.doc);
    } else if (change.type == 'removed'){
      let li = cafeList.querySelector('[data-id=' + change.doc.id + ']')
      cafeList.removeChild(li);
    }
  })
})

//Load categories from server
const loadCategories = ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories))
    .catch(err=>console.log(err))
}

// Display categories in HTML page as buttons
const displayCategories = category => {
    const catContainer = document.getElementById('categories');
    let btns = "";
    category.forEach(item=>btns+=(`
        <button id="btn-${item.category_id}" class="btn sm:text-base bg-orange-400 text-white uppercase">
            ${item.category}
        </button>
    `))

    catContainer.innerHTML = btns;
    catContainer.onclick = e=>{
        const btn = e.target;
        if(btn.tagName!=='BUTTON')return;
        const id = btn.id.split('-')[1];
        const currentActive = document.querySelector(".bg-red-500");
        if(currentActive){
            currentActive.classList.add("bg-orange-400");
            currentActive.classList.remove("bg-red-500");
        }
        btn.classList.remove("bg-orange-400");
        btn.classList.add("bg-red-500");

        loadVideos("https://openapi.programming-hero.com/api/phero-tube/category/"+id, true);
    }
}

loadCategories();
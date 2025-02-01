document.addEventListener("DOMContentLoaded", function () {
    // Poem Submission
    const form = document.getElementById("poem-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;

            if (title && content) {
                let poems = JSON.parse(localStorage.getItem("poems")) || [];
                poems.push({ title, content });
                localStorage.setItem("poems", JSON.stringify(poems));

                document.getElementById("message").textContent = "Poem submitted successfully!";
                form.reset();
            }
        });
    }

    // Display Poems
    const poemList = document.getElementById("poem-list");
    if (poemList) {
        let poems = JSON.parse(localStorage.getItem("poems")) || [];

        if (poems.length === 0) {
            poemList.innerHTML = "<p>No poems available. Submit one!</p>";
        } else {
            poems.forEach((poem, index) => {
                let poemItem = document.createElement("div");
                poemItem.classList.add("poem-item");

                let titleLink = document.createElement("a");
                titleLink.href = `poem.html?id=${index}`;
                titleLink.textContent = `📜 ${poem.title}`;

                let editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.onclick = () => editPoem(index);

                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => deletePoem(index);

                poemItem.appendChild(titleLink);
                poemItem.appendChild(editButton);
                poemItem.appendChild(deleteButton);
                poemList.appendChild(poemItem);
            });
        }
    }

    // Edit Poem
    function editPoem(index) {
        let poems = JSON.parse(localStorage.getItem("poems")) || [];
        let newTitle = prompt("Edit poem title:", poems[index].title);
        let newContent = prompt("Edit poem content:", poems[index].content);

        if (newTitle && newContent) {
            poems[index] = { title: newTitle, content: newContent };
            localStorage.setItem("poems", JSON.stringify(poems));
            location.reload();
        }
    }

    // Delete Poem
    function deletePoem(index) {
        let poems = JSON.parse(localStorage.getItem("poems")) || [];
        if (confirm("Are you sure you want to delete this poem?")) {
            poems.splice(index, 1);
            localStorage.setItem("poems", JSON.stringify(poems));
            location.reload();
        }
    }
});

const barIcon = document.querySelector(".bar-icon");
const sidebar = document.getElementById("sidebar");

// sidebar functionality
barIcon.addEventListener("click", () => {
  sidebar.style.display === "none"
    ? (sidebar.style.display = "block")
    : (sidebar.style.display = "none");
  sidebar.style.width = "50vw";
});

// form data
document.addEventListener("DOMContentLoaded", () => {
  const formData = [
    {
      id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
      type: "input",
      label: "Sample Label",
      placeholder: "Sample placeholder",
    },
    {
      id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
      type: "select",
      label: "Sample Label",
      options: ["Sample Option 1", "Sample Option 2", "Sample Option 3"],
    },
    {
      id: "45002ecf-85cf-4852-bc46-529f94a758f5",
      type: "input",
      label: "Sample Label",
      placeholder: "Sample Placeholder",
    },
    {
      id: "680cff8d-c7f9-40be-8767-e3d6ba420952",
      type: "textarea",
      label: "Sample Label",
      placeholder: "Sample Placeholder",
    },
  ];

  const formContainer = document.getElementById("form-container");

  //Render form elements from data
  formData.forEach((item) => {
    const formElement = createFormElement(item);
    formContainer.append(formElement);
  });

  // to add new form elements
  document.getElementById("input-btn").addEventListener("click", () => {
    const newItem = {
      id: uuid.v4(),
      type: "input",
      label: "Sample Label",
      placeholder: "Sample Placeholder",
    };
    const newFormElement = createFormElement(newItem);
    formContainer.append(newFormElement);
  });

  document.getElementById("select-btn").addEventListener("click", () => {
    const newItem = {
      id: uuid.v4(),
      type: "select",
      label: "Sample Label",
      options: ["Sample Option 1", "Sample Option 2", "Sample Option 3"],
    };
    const newFormElement = createFormElement(newItem);
    formContainer.append(newFormElement);
  });

  document.getElementById("textarea-btn").addEventListener("click", () => {
    const newItem = {
      id: uuid.v4(),
      type: "textarea",
      label: "Sample Label",
      placeholder: "Sample Placeholder",
    };
    const newFormElement = createFormElement(newItem);
    formContainer.append(newFormElement);
  });
  // form creation function
  function createFormElement(item) {
    const formElement = document.createElement("div");
    formElement.classList.add("form-element");
    // drag drop functionality
    formElement.draggable = true; // form element draggable
    formElement.addEventListener("dragstart", (event) => {
      event.target.classList.add("dragging");
    });
    formContainer.addEventListener("dragover", (event) => {
      event.preventDefault();
      const draggingElement = document.querySelector(".dragging");
      if (
        draggingElement &&
        draggingElement !== event.target &&
        event.target.classList.contains("form-element")
      ) {
        const boundingRect = event.target.getBoundingClientRect();
        const offset = event.clientY - boundingRect.top;
        const nextElement =
          offset > boundingRect.height / 2
            ? event.target.nextElementSibling
            : event.target;
        formContainer.insertBefore(draggingElement, nextElement);
      }
    });

    formContainer.addEventListener("drop", (event) => {
      event.preventDefault();
      const draggingElement = document.querySelector(".dragging");
      if (draggingElement) {
        draggingElement.classList.remove("dragging");
      }
    });
    // form element creation
    switch (item.type) {
      case "input":
        formElement.innerHTML = `
                    <section style='display:flex;justify-content:space-between'>
                    <label for="${item.id}">${item.label}</label>
                    <section>
                    <i class="fa-solid fa-pen-to-square edit-icn"  style="margin-right:10px"></i>
                    <i class="fa-solid fa-trash del-icn"></i>
                    </section>
                    </section>
                    <input type="text" id="${item.id}" placeholder="${item.placeholder}">
                `;
        break;
      case "select":
        formElement.innerHTML = `
        <section style='display:flex;justify-content:space-between'>
                    <label for="${item.id}">${item.label}</label>
                    <section>
                    <i class="fa-solid fa-pen-to-square edit-icn"  style="margin-right:10px"></i>
                    <i class="fa-solid fa-trash del-icn"></i>
                    </section>
                    </section>
                    <select id="${item.id}">
                        ${item.options
                          .map(
                            (option) =>
                              `<option value="${option}"> ${option}
                              </option>`
                          )
                          .join("")}
                    </select>
                    <i class="fa-solid fa-circle-plus add-option-btn"></i>
                    <i class="fa-solid fa-trash delete-option-btn"></i>
                `;
        // add,delete option in select
        const select = formElement.querySelector("select");
        const addOptionBtn = formElement.querySelector(".add-option-btn");
        const deleteOptionBtn = formElement.querySelector(".delete-option-btn");

        addOptionBtn.addEventListener("click", () => {
          const newOption = prompt("Enter the new option:");
          if (newOption) {
            const option = document.createElement("option");
            option.textContent = newOption;
            select.append(option);
          }
        });

        deleteOptionBtn.addEventListener("click", () => {
          const selectedOption = select.options[select.selectedIndex];
          if (selectedOption) {
            select.removeChild(selectedOption);
          }
        });
        break;
      case "textarea":
        formElement.innerHTML = `
                <section style='display:flex;justify-content:space-between'>
                    <label for="${item.id}">${item.label}</label>
                    <section>
                    <i class="fa-solid fa-pen-to-square edit-icn"  style="margin-right:10px"></i>
                    <i class="fa-solid fa-trash del-icn"></i>
                    </section>
                    </section>
                    <textarea id="${item.id}" placeholder="${item.placeholder}"></textarea>
                    `;
        break;
    }
    //  to delete the form element when trash icon is clicked
    formElement.querySelector(".del-icn").addEventListener("click", () => {
      formElement.remove(); // Remove form element from the DOM
    });
    // to edit label or placeholder when edit icon is clicked
    formElement.querySelector(".edit-icn").addEventListener("click", () => {
      const label = formElement.querySelector("label");
      const input = formElement.querySelector("input");
      const textarea = formElement.querySelector("textarea");
      // contenteditable attribute for label and input/textarea elements
      if (label) {
        label.contentEditable = true;
        label.focus(); // Focus on the label
      }
      if (input) {
        input.contentEditable = true;
        input.focus(); // Focus on the input
        input.addEventListener("input", () => {
          input.placeholder = input.value;
        });
        input.addEventListener("focusout", () => {
          input.value = "";
        });
      }
      if (textarea) {
        textarea.contentEditable = true;
        textarea.focus(); // Focus on the textarea
        textarea.addEventListener("input", () => {
          textarea.placeholder = textarea.value; // Update the placeholder with the textarea value
        });
        textarea.addEventListener("focusout", () => {
          textarea.value = ""; // Clear the textarea value
        });
      }
    });

    return formElement;
  }
});

// Save json
document.getElementById("save").addEventListener("click", () => {
  const updatedFormData = [];
  const formElements = document.querySelectorAll(".form-element");

  formElements.forEach((formElement) => {
    const input = formElement.querySelector("input");
    const select = formElement.querySelector("select");
    const textarea = formElement.querySelector("textarea");

    if (input) {
      updatedFormData.push({
        id: input.id,
        type: "input",
        label: formElement.querySelector("label").textContent,
        placeholder: input.placeholder,
        value: input.value,
      });
      input.value = "";
    } else if (select) {
      const options = Array.from(select.options).map(
        (option) => option.textContent
      );
      updatedFormData.push({
        id: select.id,
        type: "select",
        label: formElement.querySelector("label").textContent,
        options: options,
        value: select.value,
      });
      select.value = "";
    } else if (textarea) {
      updatedFormData.push({
        id: textarea.id,
        type: "textarea",
        label: formElement.querySelector("label").textContent,
        placeholder: textarea.placeholder,
        value: textarea.value,
      });
      textarea.value = "";
    }
  });

  console.log(updatedFormData);
});

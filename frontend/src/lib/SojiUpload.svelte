<script lang="ts">
    import type { SojiType } from "./store";
    let soji: SojiType = {
        name: "",
        description: "",
        image: "",
        animation_url: "",
        tags: [],
    };
    function validate(e: Event) {
        e.preventDefault();
        let error = "";
        if (soji.name.length < 2) {
            error += "Name is too short\n";
        }
        if (soji.description.length < 2) {
            error += "Description is too short\n";
        }
        if (soji.image.length < 2) {
            error += "Image is too short\n";
        }
        if (soji.animation_url === "") {
            error += "Animation URL is required\n";
        }
        if (error) {
            return false;
        }
        return true;
    }

    let letIsDragging = false;
    function handleDragEnter(e: DragEvent) {
        e.preventDefault();
        console.info("drag enter");
        letIsDragging = true;
    }
    function handleDragExit(e: DragEvent) {
        e.preventDefault();
        console.info("drag exit");
        letIsDragging = false;
    }
    // you need to handle dragover and drop events for the element you want to drop on to work #bug
    function handleDragOver(e: DragEvent) {
        e.preventDefault();
    }
    function handleDropEvent(e: DragEvent) {
        e.preventDefault();
        console.info("drop");
        letIsDragging = false;
        let files = e.dataTransfer.files;
        console.info(files);
        handleFileUpload(files);
    }
    function setSojiFile(file: File) {
        if (file.type.startsWith("image/")) {
            soji.image = URL.createObjectURL(file);
        } else if (file.type.startsWith("audio/")) {
            soji.animation_url = URL.createObjectURL(file);
        }
    }
    function handleFileUpload(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            setSojiFile(files[i]);
        }
    }

    function handleDropZoneClick() {
        let inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.click();
        inputFile.onchange = (e: Event) => {
            let files = inputFile.files;
            handleFileUpload(files);
        };
    }
</script>

<div class="flex flex-col border rounded p-2">
    <form on:submit={validate}>
        <div>
            <label for="name">Name</label>
            <input class="border m-1" type="text" label="name" />
        </div>
        <div>
            <label for="description">Description</label>
            <input class="border m-1" type="text" label="description" />
        </div>
        <div>
            <label for="tags">Tags</label>
            <input class="border m-1" type="text" label="tags" />
        </div>
        <button type="submit" />
    </form>
    <div>
        <img
            style="width: 100px; height: 100px;"
            src={soji.image}
            alt={soji.name}
        />
        <audio src={soji.animation_url} controls />
    </div>
    <div>
        <div
            on:click={handleDropZoneClick}
            on:dragenter={handleDragEnter}
            on:dragleave={handleDragExit}
            on:dragover={handleDragOver}
            on:drop={handleDropEvent}
            class="border rounded w-xs h-xs  {letIsDragging
                ? 'bg-green-400'
                : 'bg-gray-200'}"
            id="dropZone"
        >
            <p>drop zone</p>
        </div>
    </div>
</div>

<style>
    #dropZone {
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 300px;
    }

    form > div {
        display: flex;
        justify-content: space-between;
    }

    form > div + * {
        margin-top: 10px;
    }
</style>

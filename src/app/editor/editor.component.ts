import { Component } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  editorContent: string = '<p>Start writing...</p>';
  showColorPicker: boolean = false;

  execCommand(command: string, value: string = '') {
    document.execCommand(command, false, value);
  }

  insertLink() {
    const url = prompt('Enter the link URL:');
    if (url) {
      this.execCommand('createLink', url);
    }
  }

  insertImage() {
    const url = prompt('Enter the image URL:');
    if (url) {
      this.execCommand('insertImage', url);
    }
  }

  insertVideo() {
    const url = prompt('Enter the video URL:');
    if (url) {
      const videoEmbed = `<iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>`;
      this.editorContent += videoEmbed;
    }
  }

  chooseFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.execCommand('insertImage', e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }

  changeFontSize(event: Event) {
    const size = (event.target as HTMLInputElement).value;
    if (size) {
      this.execCommand('fontSize', size);
    }
  }

  changeTextColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.execCommand('foreColor', color);
  }

  toggleColorPicker() {
    this.showColorPicker = !this.showColorPicker;
  }

  changeBackgroundColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.execCommand('backColor', color);
    this.showColorPicker = false; 
  }

  onInput(event: Event) {
    const target = event.target as HTMLElement;
    if (target) {
      this.editorContent = target.innerHTML;
    }
  }
}

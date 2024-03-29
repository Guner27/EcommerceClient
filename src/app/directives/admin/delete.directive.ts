import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "/assets/delete.png");
    img.setAttribute("style", "cursor:pointer;");
    img.width = 28;
    img.height = 30;
    _renderer.appendChild(element.nativeElement, img)
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @HostListener("click")
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: () => {
        this.spinner.show(SpinnerType.Pacman);
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe(data => {
          $(td.parentElement).animate({
            opacity: 0,
            left: "+50",
            height: "toogle"
          }, 700, () => {
            this.callback.emit();
            this.alertifyService.message("Ürün başarıyla silindi.", {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopCenter
            })
          })

        }, (errorResponse: HttpErrorResponse) => {
          this.spinner.hide(SpinnerType.Pacman);
          this.alertifyService.message("Ürün silinirken beklenmeyen bir hata ile karşılaşıldı.", {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopCenter
          });
        });

      }
    });
  }
}

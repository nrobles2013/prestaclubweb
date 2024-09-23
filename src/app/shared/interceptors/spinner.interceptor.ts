import { HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize } from "rxjs";
import { SpinnerService } from "src/app/services/global/spinner.service";

export const spinnerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const spinnerService = inject(SpinnerService);

    spinnerService.show();
    
    return next(req).pipe(
        finalize(() => {
            spinnerService.hide();
        })
    );
  };
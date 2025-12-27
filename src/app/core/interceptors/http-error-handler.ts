import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../features/auth/auth-service";

export function handleHttpError(
  error: HttpErrorResponse,
  router: Router,
  authService: AuthService
) {
  switch (error.status) {
    case 0:
      router.navigate(['/server-down']);
      break;
    case 401:
      authService.logout();
      router.navigate(['/401']);
      break;
    case 403:
      router.navigate(['/403']);
      break;
    case 500:
      router.navigate(['/500']);
      break;
  }
}

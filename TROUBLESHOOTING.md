# Troubleshooting — Laravel + Vue (SPA, Sanctum)

Ściąga do samodzielnego debugowania. Komendy pisane pod **Git Bash** na Windowsie.

## Architektura i porty

| Usługa | Port | Jak uruchomić | Jak sprawdzić |
|--------|------|---------------|---------------|
| MariaDB (baza) | `3306` | uruchamiana ręcznie (portable) | `netstat -ano \| grep :3306` |
| Backend (Laravel) | `8000` | `php artisan serve` w `backend/` | `curl http://127.0.0.1:8000/up` → 200 |
| Frontend (Vite) | `3000` | `npm run dev` w `Frontend/frontend/` | otwórz `http://localhost:3000` |

Przepływ logowania/rejestracji (Sanctum SPA):
`GET /sanctum/csrf-cookie` (ustawia ciasteczko `XSRF-TOKEN`) → potem `POST /api/register` (axios dokłada nagłówek `X-XSRF-TOKEN`).

---

## ⚡ Szybka diagnoza (zacznij ZAWSZE od tego)

```bash
# Czy wszystkie trzy usługi żyją?
netstat -ano | grep LISTENING | grep -E ":3000|:8000|:3306"
#   brak :8000 = backend padł | brak :3000 = front padł | brak :3306 = baza padła

# Czy backend odpowiada?
curl http://127.0.0.1:8000/up
#   HTTP 200                     = backend żyje
#   Connection refused / Failed  = backend LEŻY → odpal go
```

---

## Najczęstsze błędy

### 1. Błąd CORS z „Kod stanu: (null)" / „nieudane żądanie CORS"
**To NIE jest CORS.** Backend w ogóle nie odpowiada (padł/crash). Status `null` = brak jakiejkolwiek odpowiedzi.

**Fix:**
```bash
cd "/c/Users/AMalachowska/Desktop/New folder/VueLaravelProject/backend"
php artisan serve
```

### 2. Błąd CORS „Access-Control-Allow-Origin nie pasuje do http://localhost:3000"
Backend **żyje**, ale strona jest otwarta na **złym porcie** (np. `3001`), albo masz stare ciasteczka.

**Fix:** sprawdź w pasku adresu, że to **dokładnie** `http://localhost:3000`. Mamy `strictPort: true` w `vite.config.ts`, więc Vite nie powinien już uciekać na 3001 — jeśli port jest zajęty, wywali błąd zamiast cicho zmienić port.

### 3. Kody HTTP — co znaczą
| Kod | Znaczenie | Co robić |
|-----|-----------|----------|
| `204` | csrf-cookie OK | nic, tak ma być |
| `201` | utworzono (rejestracja OK) | nic, sukces |
| `419` | CSRF token mismatch | axios musi mieć `withXSRFToken: true` + `withCredentials: true` (cross-origin); wyczyść ciasteczka |
| `422` | błąd **walidacji** | to NIE błąd serwera — pokaż użytkownikowi komunikaty z `error.response.data.errors` |
| `500` | błąd serwera | zobacz log: `backend/storage/logs/laravel.log` |

### 4. Backend pada sam z siebie (brak RAM / OOM)
Powracający problem na tej maszynie: backend + frontend + baza + edytor naraz przepełniają pamięć.

```bash
# zobacz procesy i ich pamięć
tasklist | grep -iE "php|node|maria"
```
Trzymaj **po jednym** z każdego: jeden `php artisan serve`, jeden `npm run dev`, jedna baza. Zabij duplikaty:
```bash
taskkill //PID <numer> //F
```

### 5. Zacięty / nieaktualny backend po crashu
```bash
cd "/c/Users/AMalachowska/Desktop/New folder/VueLaravelProject/backend"
php artisan optimize:clear   # czyści config/route/view cache
php artisan serve
```

---

## Przydatne komendy

### Test całego przepływu bez przeglądarki
Jeśli to zwróci `204`, backend i CORS są OK → wina po stronie przeglądarki (zły port / stare ciasteczka):
```bash
curl -i -H "Origin: http://localhost:3000" http://127.0.0.1:8000/sanctum/csrf-cookie
```

### Czy użytkownik zapisał się w bazie?
```bash
cd "/c/Users/AMalachowska/Desktop/New folder/VueLaravelProject/backend"
php artisan tinker --execute="echo App\Models\User::count();"
php artisan tinker --execute="App\Models\User::latest()->take(3)->get(['id','name','email'])->each(fn(\$u)=>print_r(\$u->toArray()));"
```

### Reset stanu w przeglądarce (gdy „coś się przykleiło")
1. DevTools (`F12`) → **Application → Cookies → localhost**
2. Usuń `XSRF-TOKEN` i `laravel-session`
3. `Ctrl+Shift+R` (twardy reload)

### Lista tras API
```bash
php artisan route:list        # UWAGA: 'art' to nie komenda — używaj 'php artisan'
```

---

## Reguła nr 1
Zanim zaczniesz grzebać w CORS/konfiguracji — **najpierw sprawdź `curl http://127.0.0.1:8000/up`**.
Większość „błędów CORS" w tym projekcie to po prostu **leżący backend**.

# VueLaravelProject

Aplikacja SPA: **Laravel** (API, Sanctum) + **Vue** (Vite) + przenośna **MariaDB**.

Pełna ściąga do debugowania jest w [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md).

## Usługi i porty

| Usługa | Port | Jak uruchomić |
|--------|------|---------------|
| MariaDB (baza) | `3306` | `~/db-tools/start-db.sh` (patrz niżej) |
| Backend (Laravel) | `8000` | `php artisan serve` w `backend/` |
| Frontend (Vite) | `3000` | `npm run dev` w `Frontend/frontend/` |

## Uruchomienie bazy danych (db-tools)

Baza to **przenośna MariaDB** w `~/db-tools/` — nie startuje automatycznie, trzeba ją odpalić ręcznie i zostawić uruchomiony terminal. Robi to skrypt `~/db-tools/start-db.sh`:

```bash
#!/usr/bin/env bash
# Uruchamia przenosny serwer MariaDB (port 3306)

DATADIR=$(cygpath -w "$HOME/db-tools/data")
exec "$HOME/db-tools/mariadb-11.8.9-winx64/bin/mariadbd.exe" --datadir="$DATADIR" --port=3306 --console
```

Uruchomienie:

```bash
~/db-tools/start-db.sh
```

Sprawdzenie, czy baza nasłuchuje:

```bash
netstat -ano | grep LISTENING | grep :3306   # jest wpis = baza żyje
```

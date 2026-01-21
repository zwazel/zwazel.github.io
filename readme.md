# LB2 - Praktische Prüfung (Variante B)

**Thema:** Reportgenerator für Projektfortschritt
**Zeit:** 60 Minuten
**Dateiname:** `report_generator.py`

## Vorbereitung & Umgebung
Sie erhalten das Skript `setup_env.py`. Dieses Skript erstellt eine Testumgebung mit allen benötigten Dateien.
- **Verwendung**: `python setup_env.py --variant_b [VERZEICHNISNAME]`
- **Beispiel**: `python setup_env.py --variant_b arbeitsverzeichnis` erstellt den Ordner `arbeitsverzeichnis`.

### Generierte Struktur
```
arbeitsverzeichnis/
├── projects.csv
└── template/
    ├── report.md
    └── status.txt
```

### Inhalt von `projects.csv`
```csv
projektname,verantwortlicher,status
Webshop-Relaunch,Max Mueller,In Arbeit
Datenbank-Migration,Anna Schmidt,Abgeschlossen
API-Integration,Felix Weber,Geplant
```

### Inhalt von `template/report.md`
```markdown
# Projektbericht: {{PROJEKTNAME}}

**Verantwortlich:** {{VERANTWORTLICHER}}
**Status:** {{STATUS}}
**Berichtsdatum:** {{DATE}}

---
*Bericht-ID: {{REPORT_ID}}*
```

### Inhalt von `template/status.txt`
```
Projekt: {{PROJEKTNAME}}
Leitung: {{VERANTWORTLICHER}}
Aktueller Stand: {{STATUS}}
Generiert: {{DATE}}
ID: {{REPORT_ID}}
```

**Wichtig**: Führen Sie dieses Setup-Skript vor jedem Testlauf Ihres eigenen Scripts aus, um eine saubere Ausgangslage zu garantieren.

## Aufgabenstellung
Schreiben Sie ein Python-Script `report_generator.py`, das für jedes Projekt in der CSV-Datei einen eigenen Ordner mit personalisierten Report-Dateien erstellt.

---

### 1. Funktion: `write_log(message, log_path)`
Erstellen Sie eine Logging-Funktion.
- **Parameter**:
  - `message`: Die zu loggende Nachricht.
  - `log_path`: Pfad zur Log-Datei.
- **Verhalten**:
  - Hängt die Nachricht **mit Zeilenumbruch** an die bestehende Log-Datei an (Append-Modus).
  - Gibt die Nachricht **mit Zeilenumbruch** auf `stdout` aus (z.B. mit `print()`).
- **Log-Datei**: `generation_log.txt` im Arbeitsverzeichnis.

---

### 2. Funktion: `parse_arguments()`
Erstellen Sie eine Funktion, die die Kommandozeilenargumente verarbeitet.
- Das Script muss **einen** Parameter entgegennehmen: Den Pfad zum Arbeitsverzeichnis (z.B. `arbeitsverzeichnis`).
- **Fehlerfall 1** - Kein Parameter übergeben:
  - Ausgabe auf `stderr`: `Fehler: Kein Verzeichnis angegeben.`
  - Exit-Code: `1`
- **Fehlerfall 2** - Verzeichnis existiert nicht:
  - Ausgabe auf `stderr`: `Fehler: Verzeichnis '{pfad}' existiert nicht.`
  - Exit-Code: `1`
- **Rückgabe**: Den validierten Pfad als String.

---

### 3. Funktion: `read_projects(csv_path)`
Erstellen Sie eine Funktion, die die Projektliste aus der CSV-Datei liest.
- **Parameter**: Pfad zur `projects.csv`-Datei.
- **Rückgabe**: Eine Liste von Dictionaries, wobei jedes Dictionary ein Projekt repräsentiert.
- **Beispiel-Rückgabe**:
```python
[
    {"projektname": "Webshop-Relaunch", "verantwortlicher": "Max Mueller", "status": "In Arbeit"},
    {"projektname": "Datenbank-Migration", "verantwortlicher": "Anna Schmidt", "status": "Abgeschlossen"},
    {"projektname": "API-Integration", "verantwortlicher": "Felix Weber", "status": "Geplant"}
]
```

---

### 4. Funktion: `create_project_folder(base_path, project)`
Erstellen Sie eine Funktion, die für ein Projekt einen personalisierten Ordner erstellt.
- **Parameter**:
  - `base_path`: Das Arbeitsverzeichnis (z.B. `arbeitsverzeichnis`).
  - `project`: Ein Dictionary mit Projektdaten.
- **Ordnername-Format**: `{projektname}` (kleingeschrieben, Bindestriche durch Unterstriche ersetzt)
  - Beispiel: `Webshop-Relaunch` → `webshop_relaunch`
  - Beispiel: `API-Integration` → `api_integration`
- **Verhalten**: Kopiert den gesamten Inhalt von `template/` in den neuen Projektordner.
- **Rückgabe**: Den Pfad zum erstellten Projektordner.

---

### 5. Funktion: `replace_placeholders(folder_path, project, index)`
Erstellen Sie eine Funktion, die alle Platzhalter in den Report-Dateien ersetzt.
- **Parameter**:
  - `folder_path`: Pfad zum Projektordner.
  - `project`: Ein Dictionary mit Projektdaten.
  - `index`: Die laufende Nummer des Projekts (1, 2, 3, ...).
- **Platzhalter-Ersetzungen**:
  - `{{PROJEKTNAME}}` → Name des Projekts (z.B. `Webshop-Relaunch`)
  - `{{VERANTWORTLICHER}}` → Name des Verantwortlichen (z.B. `Max Mueller`)
  - `{{STATUS}}` → Status des Projekts (z.B. `In Arbeit`)
  - `{{DATE}}` → Aktuelles Datum im Format `YYYY-MM-DD` (z.B. `2026-01-19`)
  - `{{REPORT_ID}}` → `PRJ-{index:03d}` (z.B. `PRJ-001`, `PRJ-002`)
- **Verhalten**: Alle Dateien im Ordner (`report.md` und `status.txt`) müssen bearbeitet werden.

---

### 6. Hauptprogramm (`main`)
Verbinden Sie alle Funktionen im Hauptprogramm:
1. Argumente parsen
2. Projekte einlesen
3. Für jedes Projekt (mit Index beginnend bei 1):
   - Ordner erstellen
   - Platzhalter ersetzen
   - Log-Eintrag schreiben: `Ordner erstellt: {ordnername}` (Verwenden Sie hierfür die Funktion `write_log`)
4. Zusammenfassung am Ende loggen: `Insgesamt {anzahl} Ordner erstellt.` (Verwenden Sie hierfür die Funktion `write_log`)

---

## Beispielaufruf
```bash
# 1. Umgebung vorbereiten
python setup_env.py --variant_b arbeitsverzeichnis

# 2. Ihr Script testen
python report_generator.py arbeitsverzeichnis
```

## Erwartete Ausgabe auf stdout (exakt)
```
Ordner erstellt: webshop_relaunch
Ordner erstellt: datenbank_migration
Ordner erstellt: api_integration
Insgesamt 3 Ordner erstellt.
```

## Erwarteter Inhalt von `generation_log.txt` (exakt)
```
Ordner erstellt: webshop_relaunch
Ordner erstellt: datenbank_migration
Ordner erstellt: api_integration
Insgesamt 3 Ordner erstellt.
```

## Erwartete Ordnerstruktur nach Ausführung
```
arbeitsverzeichnis/
├── projects.csv
├── template/
│   ├── report.md
│   └── status.txt
├── generation_log.txt
├── webshop_relaunch/
│   ├── report.md
│   └── status.txt
├── datenbank_migration/
│   ├── report.md
│   └── status.txt
└── api_integration/
    ├── report.md
    └── status.txt
```

## Erwarteter Inhalt der generierten Dateien

### Beispiel: `webshop_relaunch/report.md`
```markdown
# Projektbericht: Webshop-Relaunch

**Verantwortlich:** Max Mueller
**Status:** In Arbeit
**Berichtsdatum:** 2026-01-19

---
*Bericht-ID: PRJ-001*
```

### Beispiel: `webshop_relaunch/status.txt`
```
Projekt: Webshop-Relaunch
Leitung: Max Mueller
Aktueller Stand: In Arbeit
Generiert: 2026-01-19
ID: PRJ-001
```

---

## Erlaubte Hilfsmittel (Allowed Resources)
- **Erlaubt**:
    - **Moodle**: Kursinhalte und Links.
    - **Wiki BZZ**: Offizielle Dokumentation.
    - **Handnotizen**: Eigene Zusammenfassungen.
    - **Python-Dokumentation**: `help()`, offizielle Docs.
- **VERBOTEN**:
    - **KI-Tools**: ChatGPT, Copilot, etc.
    - **Kommunikation**: Teams, Discord, etc.

## Bewertungskriterien (Blueprint für Korrektur)
Ihr Script wird automatisch mit verschiedenen Testfällen geprüft. Jede Funktion wird einzeln bewertet:

1.  **Funktion `write_log()`** (Punkte: X)
    - Wird die Nachricht an die Datei angehängt (nicht überschrieben)?
    - Wird die Nachricht auf `stdout` ausgegeben?

2.  **Funktion `parse_arguments()`** (Punkte: X)
    - Wird bei fehlendem Parameter die exakte Fehlermeldung ausgegeben?
    - Wird bei nicht-existierendem Verzeichnis die exakte Fehlermeldung ausgegeben?
    - Wird der Exit-Code `1` bei Fehlern gesetzt?

3.  **Funktion `read_projects()`** (Punkte: X)
    - Wird die CSV-Datei korrekt gelesen?
    - Ist die Rückgabestruktur (Liste von Dictionaries) exakt korrekt?

4.  **Funktion `create_project_folder()`** (Punkte: X)
    - Wird der Ordnername exakt korrekt generiert?
    - Werden alle Template-Dateien kopiert?

5.  **Funktion `replace_placeholders()`** (Punkte: X)
    - Werden alle Platzhalter exakt korrekt ersetzt?
    - Stimmt das Datums-Format exakt (`YYYY-MM-DD`)?
    - Wird die Report-ID korrekt generiert (Format `PRJ-XXX`)?
    - Funktioniert es für beide Dateitypen (`.md` und `.txt`)?

6.  **Hauptprogramm & Integration** (Punkte: X)
    - Werden alle Funktionen korrekt aufgerufen?
    - Entspricht die Ausgabe exakt dem erwarteten Format?
    - Existiert die `generation_log.txt` mit exakt korrektem Inhalt?

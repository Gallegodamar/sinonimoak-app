import streamlit as st
import pandas as pd
import json
from pathlib import Path

DATA_FILE = Path("diccionario.json")

def cargar_diccionario():
    if DATA_FILE.exists():
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return []
    else:
        return []

def guardar_diccionario(diccionario):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(diccionario, f, ensure_ascii=False, indent=2)

def mostrar_diccionario(diccionario):
    df = pd.DataFrame([
        {
            "Palabra": e["palabra"],
            "Definizioak": ", ".join(e["definizioak"]),
            "Adibideak": ", ".join(e["adibideak"])
        } for e in diccionario
    ])
    st.dataframe(df, use_container_width=True)

def main():
    st.title("📘 Hiztegi pertsonalizatua")

    diccionario = cargar_diccionario()

    st.subheader("🔍 Bilatu hitza")
    bilatu = st.text_input("Idatzi bilatu nahi duzun hitza:").strip().lower()
    if bilatu:
        emaitzak = [e for e in diccionario if e["palabra"].lower() == bilatu]
        if emaitzak:
            st.success(f"'{bilatu}' hitza aurkitu da.")
            mostrar_diccionario(emaitzak)
        else:
            st.warning(f"Ez da aurkitu '{bilatu}' hitza.")

    st.divider()

    st.subheader("➕ Hitz berria gehitu")
    with st.form("hitz_berria"):
        hitza = st.text_input("Hitz berria")
        definizioak = st.text_area("Definizioak (komaz bereizita)")
        adibideak = st.text_area("Adibideak (komaz bereizita)")
        gorde = st.form_submit_button("Gorde")

        if gorde:
            berria = {
                "palabra": hitza.strip(),
                "definizioak": [d.strip() for d in definizioak.split(",") if d.strip()],
                "adibideak": [a.strip() for a in adibideak.split(",") if a.strip()]
            }
            if not any(e["palabra"].lower() == berria["palabra"].lower() for e in diccionario):
                diccionario.append(berria)
                guardar_diccionario(diccionario)
                st.success(f"'{hitza}' hitza gorde da.")
            else:
                st.warning(f"'{hitza}' hitza lehendik dago.")

    st.divider()

    st.subheader("📋 Hiztegi osoa")
    mostrar_diccionario(diccionario)

if __name__ == "__main__":
    main()

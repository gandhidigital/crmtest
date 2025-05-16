{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export default async function handler(req, res) \{\
  if (req.method !== 'POST') \{\
    return res.status(405).json(\{ error: 'M\'e9todo no permitido' \});\
  \}\
\
  try \{\
    const response = await fetch('https://script.google.com/macros/s/AKfycbw94ZykqzVa-_8JJBkbw4oHFkXfjCtYPs_2rUvjG6IrszMwSIuxL1QvMbxBGI9i9Og7Ew/exec', \{\
      method: 'POST',\
      headers: \{ 'Content-Type': 'application/json' \},\
      body: JSON.stringify(req.body),\
    \});\
\
    const text = await response.text();\
\
    try \{\
      const json = JSON.parse(text);\
      return res.status(200).json(json);\
    \} catch \{\
      return res.status(200).json(\{ result: 'ok', body: text \});\
    \}\
\
  \} catch (err) \{\
    return res.status(500).json(\{ error: 'Error en proxy: ' + err.message \});\
  \}\
\}\
}
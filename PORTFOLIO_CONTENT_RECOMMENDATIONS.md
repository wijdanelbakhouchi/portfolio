# Portfolio content recommendations

Audit date: 15 September 2026. Suggestions below are editorial TODOs, not additional claims published on the site.

## 1. Information currently missing
- Confirm whether the IPS Master's is still in progress and provide its start date and expected graduation date. The site preserves “Present” from the CV.
- Confirm current internship/job availability. The old “actively seeking” statement was removed because it may be stale.
- Resolve the email mismatch: the old site uses `wijdane.elbakhouchi24@gmail.com`, while the supplied CV uses `wijdane.elbakhouchi@gmail.com`. The site preserves its original email. Update both together once confirmed.
- Confirm the preferred English rendering of the university and degree names.

## 2. GitHub projects worth adding or expanding
- **AgentShield** is now the flagship. Public source verifies the runtime pipeline, policy actions, LangGraph handoffs, tool controls, output validation and React dashboard.
- **Projet_MAS_Smart-Parking** was missing from the original project section despite appearing in the CV; it is now featured.
- **Multi-Model-Legal-RAG** and **Spark-Streaming-Crypto** remain featured with more specific engineering stories.
- **Retail-Dynamic-Pricing-RL**, **LibData-BI-Integration**, and **Gestion-universitaire** remain linked as additional work.
- **Projet_Legal_RAG** overlaps the featured comparative RAG project. Consider explaining their evolution instead of presenting them as unrelated work.
- **MAS_Course_Labs** could support an experiments page after individual lab goals and results are documented.
- Spring Boot relationship exercises demonstrate learning, but are not stronger flagship candidates than the systems above.

## 3. Skills discovered in repositories
| Evidence | Technologies or concepts |
| --- | --- |
| AgentShield requirements, frontend manifest, security/pipeline.py, policy/policy_engine.py | FastAPI, LangGraph, SQLAlchemy, React, layered runtime mediation, four policy actions |
| Smart Parking backend/model.py and frontend manifest | Mesa, FastAPI, React, Vickrey auctions, simulation measurements |
| Multi-Model-Legal-RAG/projet_dl.py | PyTorch, Transformers, Hugging Face embeddings, ChromaDB, Gradio, quantization dependencies |
| Spark source and docker-compose.yml tree | PySpark, Kafka-compatible Redpanda, InfluxDB, Delta Lake, MinIO, Docker Compose |
| LibData README and PHP file tree | PHP, MySQL, Power BI, Power Query, library metadata ETL |

These are evidence-backed technologies, not claims of expert-level proficiency. No percentage skill bars are used.

## 4. Missing project screenshots
- Supply a redacted AgentShield dashboard screenshot and a successful end-to-end trace suitable for public sharing.
- Add paired Gradio interfaces and an annotated evaluation plot for Legal RAG.
- Add an actual Grafana dashboard and verified cold-storage output for Spark.
- Add the Smart Parking simulation with an explanation of parameters.
- Current portfolio visuals are original conceptual diagrams, not fabricated screenshots or measured results.

## 5. README gaps and inconsistencies
- AgentShield repository has no short GitHub description. Add an accurate research-prototype description and topics.
- Smart Parking README includes a JADE badge although the actual implementation uses Python/Mesa. Its installation paths also differ from the current tree.
- Multi-Model Legal RAG badges mention Gemini/Groq and Streamlit, while the inspected source and detailed README describe Mistral/TinyLlama and Gradio. Align badges with the intended implementation.
- Retail RL badges imply DQN/Gym/PyTorch; the detailed description centers on tabular Q-learning with NumPy/Pandas. Verify before claiming the former.
- Spark README clone URL refers to a different repository name. Confirm referenced architecture and dashboard artifacts are actually present and document reproducible setup.
- Course and empty-description repositories need goals, setup instructions, screenshots and limitations before being showcased.

## 6. Missing links
- Final public portfolio URL, needed to generate the canonical URL and sitemap without inventing a domain.
- AgentShield thesis PDF, publication/preprint, and approved demonstration link, if available.
- Working hosted demos for projects; no demo URLs were invented.
- Public certificate verification URLs for IBM/Coursera and Udemy.

## 7. Missing project descriptions
- Add exact team size, your role, the components you implemented and decisions you owned.
- Spark explicitly credits four students; the portfolio identifies it as collaborative work.
- Provide your own lessons learned for each project. The site describes technical challenges without inventing personal recollections.

## 8. Achievements to verify
- Reproducible AgentShield evaluation outcomes with dataset versions, baselines, latency, benign-task utility, false positives and raw traces.
- Reproducible Legal RAG model comparisons under identical conditions.
- Spark throughput/latency and simulation-scale limits.
- Before/after outcomes for the internship, if measured and approved for disclosure.
- Do not substitute repository README marketing statements for measured evidence.

## 9. Certifications, only if held
- Existing CV lists IBM/Coursera Machine Learning with Python and Udemy REST APIs Development with Java; preserved without invented dates.
- Add issue dates and credential links. Add other certifications only after confirming they were earned.

## 10. Material to provide later
- Updated CV, preferred email, graduation/availability details, project ownership notes, screenshots and a final deployment domain.
- The provided photo is used without facial alteration. A neutral-background portrait would be an optional future replacement.

## 11. Recruiter improvements
- State the specific internship/role you want once availability is confirmed.
- Add short project demo videos and measurable, defensible outcomes.
- Include a clear individual contribution for team work.
- Consider a French version with professionally reviewed translations.

## 12. Academic/research improvements
- Publish an approved abstract, research question, threat model, methods, evaluation protocol and limitations.
- Add a reproducibility checklist and distinguish deterministic tests from real-provider end-to-end evidence.
- Provide supervisor details only with accurate attribution and permission where appropriate.
- Retain the research-prototype qualification. Do not claim production security, universal prevention or solved prompt injection.

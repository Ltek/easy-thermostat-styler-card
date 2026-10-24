// Minimal Home Assistant typings — only the slice this card reads.

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

/** `hass.entities` display entry (entity registry slice the frontend ships). */
export interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  platform?: string;
  translation_key?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, HassEntityRegistryEntry>;
  config?: { unit_system?: { temperature?: string } };
  locale?: { language?: string };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ): Promise<unknown>;
}

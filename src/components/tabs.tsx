"use client";

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { RequestForm } from './request-form';
import { History } from './history';
import { Collections } from './collections';
import { Settings } from './settings';

export function Tabs() {
  return (
    <TabsPrimitive.Root defaultValue="request">
      <TabsPrimitive.List className="flex border-b">
        <TabsPrimitive.Trigger
          value="request"
          className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Request
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger
          value="history"
          className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary"
        >
          History
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger
          value="collections"
          className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Collections
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger
          value="settings"
          className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Settings
        </TabsPrimitive.Trigger>
      </TabsPrimitive.List>

      <TabsPrimitive.Content value="request" className="py-4">
        <RequestForm />
      </TabsPrimitive.Content>

      <TabsPrimitive.Content value="history" className="py-4">
        <History />
      </TabsPrimitive.Content>

      <TabsPrimitive.Content value="collections" className="py-4">
        <Collections />
      </TabsPrimitive.Content>

      <TabsPrimitive.Content value="settings" className="py-4">
        <Settings />
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );
}
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import SVG from 'react-inlinesvg'

import { DEFAULT_SIDEBAR_BEHAVIOR } from 'components/interfaces/Sidebar'
import Panel from 'components/ui/Panel'
import { useLocalStorageQuery } from 'hooks/misc/useLocalStorage'
import { BASE_PATH } from 'lib/constants'
import {
  Label_Shadcn_,
  RadioGroup_Shadcn_,
  RadioGroupLargeItem_Shadcn_,
  Select_Shadcn_,
  SelectContent_Shadcn_,
  SelectItem_Shadcn_,
  SelectTrigger_Shadcn_,
  SelectValue_Shadcn_,
  Separator,
  singleThemes,
  Theme,
} from 'ui'
import { FormItemLayout } from 'ui-patterns/form/FormItemLayout/FormItemLayout'
import { LOCAL_STORAGE_KEYS } from 'common'

export const ThemeSettings = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const [sidebarBehaviour, setSidebarBehaviour] = useLocalStorageQuery(
    LOCAL_STORAGE_KEYS.SIDEBAR_BEHAVIOR,
    DEFAULT_SIDEBAR_BEHAVIOR
  )
  /**
   * Avoid Hydration Mismatch
   * https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
   */
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  function SingleThemeSelection() {
    return (
      <form>
        <RadioGroup_Shadcn_
          name="theme"
          onValueChange={setTheme}
          aria-label="Choose a theme"
          defaultValue={theme}
          value={theme}
          className="flex flex-wrap gap-2 md:gap-5"
        >
          {singleThemes.map((theme: Theme) => (
            <RadioGroupLargeItem_Shadcn_
              className="p-3"
              key={theme.value}
              value={theme.value}
              label={theme.name}
            >
              <SVG src={`${BASE_PATH}/img/themes/${theme.value}.svg?v=2`} />
            </RadioGroupLargeItem_Shadcn_>
          ))}
        </RadioGroup_Shadcn_>
      </form>
    )
  }

  return (
    <Panel title={<h5 key="panel-title">Appearance</h5>}>
      <Panel.Content className="grid gap-8 !py-5">
        <div className="grid grid-cols-12">
          <div className="col-span-full md:col-span-4 flex flex-col gap-5">
            <Label_Shadcn_ htmlFor="theme" className="text-light">
              Theme mode
            </Label_Shadcn_>
            <p className="text-sm text-foreground-light max-w-[220px]">
              Choose how Skybase looks to you. Select a single theme, or sync with your system.
            </p>
          </div>

          <div className="col-span-full md:col-span-8 flex flex-col gap-4">
            <p className="text-sm text-light">Skybase will use your selected theme</p>
            <SingleThemeSelection />
          </div>
        </div>
      </Panel.Content>
      <Separator />
      <Panel.Content>
        <FormItemLayout
          isReactForm={false}
          label="Sidebar behavior"
          layout="flex-row-reverse"
          description="Choose your preferred sidebar behavior: open, closed, or expand on hover."
        >
          <Select_Shadcn_
            value={sidebarBehaviour}
            onValueChange={setSidebarBehaviour}
            aria-label="Select an option"
          >
            <SelectTrigger_Shadcn_>
              <SelectValue_Shadcn_ placeholder="Choose an option" />
            </SelectTrigger_Shadcn_>
            <SelectContent_Shadcn_>
              <SelectItem_Shadcn_ value="open">Expanded</SelectItem_Shadcn_>
              <SelectItem_Shadcn_ value="closed">Collapsed</SelectItem_Shadcn_>
              <SelectItem_Shadcn_ value="expandable">Expand on hover</SelectItem_Shadcn_>
            </SelectContent_Shadcn_>
          </Select_Shadcn_>
        </FormItemLayout>
      </Panel.Content>
    </Panel>
  )
}

import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, joinSegments, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { classNames } from "../util/lang"

type CrumbData = {
  displayName: string
  path: string
}

interface BreadcrumbOptions {
  spacerSymbol: string
  rootName: string
  resolveFrontmatterTitle: boolean
  hideOnRoot: boolean
  showCurrentPage: boolean
}

const defaultOptions: BreadcrumbOptions = {
  spacerSymbol: "❯",
  rootName: "Home",
  resolveFrontmatterTitle: true,
  hideOnRoot: true,
  showCurrentPage: true,
}

function formatCrumb(displayName: string, baseSlug: FullSlug, currentSlug: SimpleSlug): CrumbData {
  return {
    displayName: displayName.replaceAll("-", " "),
    path: resolveRelative(baseSlug, currentSlug),
  }
}

export default ((opts?: Partial<BreadcrumbOptions>) => {
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }

  let folderIndex: Map<string, QuartzPluginData> | undefined

  const Breadcrumbs: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    if (options.hideOnRoot && fileData.slug === "index") {
      return <></>
    }

    const firstEntry = formatCrumb(options.rootName, fileData.slug!, "/" as SimpleSlug)
    const crumbs: CrumbData[] = [firstEntry]

    if (!folderIndex && options.resolveFrontmatterTitle) {
      folderIndex = new Map()
      for (const file of allFiles) {
        const folderParts = file.slug?.split("/")
        if (folderParts?.at(-1) === "index") {
          folderIndex.set(folderParts.slice(0, -1).join("/"), file)
        }
      }
    }

    const slugParts = fileData.slug?.split("/")
    if (slugParts) {
      const isTagPath = slugParts[0] === "tags"
      let currentPath = ""

      for (let i = 0; i < slugParts.length - 1; i++) {
        let curPathSegment = slugParts[i]

        const currentFile = folderIndex?.get(slugParts.slice(0, i + 1).join("/"))
        if (currentFile) {
          const title = currentFile.frontmatter!.title
          if (title !== "index") {
            curPathSegment = title
          }
        }

        currentPath = joinSegments(currentPath, slugParts[i])
        const includeTrailingSlash = !isTagPath || i < 1

        const crumb = formatCrumb(
          curPathSegment,
          fileData.slug!,
          (currentPath + (includeTrailingSlash ? "/" : "")) as SimpleSlug,
        )
        crumbs.push(crumb)
      }

      if (options.showCurrentPage && slugParts.at(-1) !== "index") {
        crumbs.push({
          displayName: fileData.frontmatter!.title,
          path: "",
        })
      }
    }

    return (
      <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
        {crumbs.map((crumb, index) => (
          <div class="breadcrumb-element">
            <a href={crumb.path} dangerouslySetInnerHTML={{ __html: crumb.displayName }}></a>
            {index !== crumbs.length - 1 && <p>{` ${options.spacerSymbol} `}</p>}
          </div>
        ))}
      </nav>
    )
  }
  Breadcrumbs.css = breadcrumbsStyle

  return Breadcrumbs
}) satisfies QuartzComponentConstructor

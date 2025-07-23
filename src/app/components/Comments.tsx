'use client'
import Giscus from '@giscus/react'

export default function Comments() {
  return (
    <div className="mt-8">
      <Giscus
        id="comments"
        repo="ukanwat/utkarsh-kanwat"  // Replace with your repo
        repoId="R_kgDOPO7KqA"               // Replace with your repo ID from giscus
        category="General"                    // Or your chosen category
        categoryId="DIC_kwDOPO7KqM4CtJjZ"         // Replace with your category ID from giscus
        mapping="pathname"
        term=""
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  )
}